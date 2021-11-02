import { Engine, Render, Runner, Body, Bodies, Composite } from 'matter-js';
import Perceptron from './Perceptron';

const ROBOT_SIZE = 15;
const SENSOR_SIZE = 2;
const MAX_FORCE = 0.02;
const STEP_SIZE = 1/100;

Body.applyRelativeForce = (body, relativePosition, relativeForce) => {
  const sin = Math.sin(body.angle);
  const cos = Math.cos(body.angle);

  const position = {
    x: body.position.x + cos * relativePosition.x - sin * relativePosition.y,
    y: body.position.y + sin * relativePosition.x + cos * relativePosition.y,
  };

  const force = {
    x: cos * relativeForce.x - sin * relativeForce.y,
    y: sin * relativeForce.x + cos * relativeForce.y,
  };

  Body.applyForce(body, position, force);
}

const Evaluator = {}

Evaluator.evaluate = async function (population, {simTime, targetPosition}) {
  let engine = Engine.create({
    gravity: {
      x: 0,
      y: 0,
    },
    timing: {
      timeScale: 1,
    },
  });

  let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      height: 800,
      width: 800,
      enabled: true,
      wireframes: false,
    }
  });
  
  Render.run(render);

  let bodies = population.map((pop) => {
    // const initialPositions = Math.shuffleArray([
    //   Math.randomArbitrary(50, 150),
    //   Math.randomArbitrary(50, 150),
    //   Math.randomArbitrary(650, 750),
    //   Math.randomArbitrary(650, 750),
    //   Math.randomArbitrary(350, 450),
    // ]);
    const body = Bodies.rectangle(Math.randomArbitrary(50, 750), Math.randomArbitrary(50, 150), ROBOT_SIZE, ROBOT_SIZE,{
      render: {
        fillStyle: pop.fillStyle,
      }
    });
  
    const sensorOptions = {
      render: {
        fillStyle: 'red',
      }
    };
  
    const sensor1 = Bodies.circle(
      body.position.x + ROBOT_SIZE/2 - SENSOR_SIZE,
      body.position.y + ROBOT_SIZE/2 - SENSOR_SIZE,
      SENSOR_SIZE,
      sensorOptions
    );
  
    const sensor2 = Bodies.circle(
      body.position.x - ROBOT_SIZE/2 + SENSOR_SIZE,
      body.position.y + ROBOT_SIZE/2 - SENSOR_SIZE,
      SENSOR_SIZE,
      sensorOptions
    );
    return Body.create({
      parts: [body, sensor1, sensor2],
    });
  });

  let target = Bodies.circle(targetPosition.x, targetPosition.y, ROBOT_SIZE/4, {
    isStatic: true,
    render: {
      fillStyle: 'green',
    }
  });

  let walls = Body.create({
    isStatic: true,
    parts: [
      Bodies.rectangle(400,800,800,20, {render: {fillStyle: 'gray'}}),
      Bodies.rectangle(400,0,800,20, {render: {fillStyle: 'gray'}}),
      Bodies.rectangle(0,400,20,800, {render: {fillStyle: 'gray'}}),
      Bodies.rectangle(800,400,20,800, {render: {fillStyle: 'gray'}}),
    ],
  });
  
  // add all of the bodies to the world
  Composite.add(engine.world, bodies);
  Composite.add(engine.world, target);
  Composite.add(engine.world, walls);

let tick = 0
while(tick <= 1/STEP_SIZE * simTime) {
  if(tick % 10 == 0){
    const force = MAX_FORCE * STEP_SIZE;
    bodies.forEach((body, index) => {
      const s1 = body.parts[1].position;
      const s2 = body.parts[2].position;
      console.log('-------');

      const s1Value = Math.sqrt(Math.pow(s1.x - target.position.x, 2) + Math.pow(s1.y - target.position.y, 2))/800;
      const s2Value = Math.sqrt(Math.pow(s2.x - target.position.x, 2) + Math.pow(s2.y - target.position.y, 2))/800;
      let force0 = Perceptron.run([s1Value, s2Value], population[index].weights[0]);
      let force1 = Perceptron.run([s1Value, s2Value], population[index].weights[1]);

      console.log(force0);
      console.log(force1);
      
      Body.applyRelativeForce(body, {x:-ROBOT_SIZE/2.5, y: ROBOT_SIZE/2.5}, {x:0, y: force0 * force});
      Body.applyRelativeForce(body, {x:ROBOT_SIZE/2.5, y: ROBOT_SIZE/2.5}, {x:0, y: force1 * force});
    });
  }
  Engine.update(engine, 1000 * STEP_SIZE);
  const time = await new Promise(resolve => setTimeout(resolve, 1000 * STEP_SIZE));
  tick++;
}
  Render.stop(render);
  document.getElementsByTagName('canvas')[0].remove();

  return bodies.map((body) => (
    Math.sqrt(
      Math.pow(body.position.x - target.position.x,2) + Math.pow(body.position.y - target.position.y,2)
    )
  ));
}

export default Evaluator
