// module aliases
import { Engine, Render, Runner, Body, Bodies, Composite } from 'matter-js';

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

// create an engine
var engine = Engine.create({
  gravity: {
    x: 0,
    y: 0,
  }
});

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      enabled: true,
      wireframes: true,
      showVelocity: true,
      showAngleIndicator: true,
      showAxes: true,
      showPositions: true,
    }
});

const ROBOT_SIZE = 20;

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 100, ROBOT_SIZE, ROBOT_SIZE);
// var boxB = Bodies.rectangle(450, 50, 80, 80);
// var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA]);

// run the renderer
Render.run(render);

let tick = 0
while(tick <= 600000) {
  if(tick % 10 == 0){
    Body.applyRelativeForce(boxA, {x:-ROBOT_SIZE/2.5, y: 0}, {x:0, y:0.01});
    Body.applyRelativeForce(boxA, {x:-ROBOT_SIZE/2.5, y: 0}, {x:0, y:0.002});
  }
  Engine.update(engine, 1000/60);
  const time = await new Promise(resolve => setTimeout(resolve, 1000/60));
  tick++;
}
