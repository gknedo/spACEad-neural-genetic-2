// module aliases
import { randomColor} from 'randomcolor';
import Evaluator from './Evaluator';
import Math from './Math'

let genColor = randomColor();

function generateRandom() {
  return {
    fillStyle: genColor,
    weights: [
      new Array(3).fill(0).map(() => Math.randomArbitrary(-10,10)),
      new Array(3).fill(0).map(() => Math.randomArbitrary(-10,10)),
    ],
  }
}

function crossover(popA, popB) {
  return {
    fillStyle: genColor,
    weights: [
      popA.weights[0].map((weight, index) => {return (popB.weights[0][index] - weight) * Math.random() + weight}),
      popA.weights[1].map((weight, index) => {return (popB.weights[1][index] - weight) * Math.random() + weight}),
    ],
  }
}

function mutate(pop) {
  const newPop = {
    fillStyle: genColor,
    weights: [
      [...(pop.weights[0])],
      [...(pop.weights[1])],
    ],
  };

  const mutP = Math.randomInt(2);
  const mutW = Math.randomInt(3);
  newPop.weights[mutP][mutW] = Math.randomArbitrary(-10,10);

  return newPop;
}

let population = Array(20).fill(0).map(() => generateRandom());
let targetPosition = {x: 400, y: 600};
let generation = 0;
while(generation < 100) {
  generation++;
  if(generation % 5 == 0) {
    targetPosition = {
      x: Math.randomInt(600) + 100,
      y: Math.randomInt(400) + 400,
    }
  }
  genColor = randomColor();
  const populationFitness = await Evaluator.evaluate(population, {
    simTime: 8,
    targetPosition
  });
  const battleOrder = Math.shuffleArray(population.map((_pop, index) => index ));
  let newPopulation = [];

  for(let i = 0; i < battleOrder.length; i+=2){
    const j = i+1;
    let winner = population[i];
    if(populationFitness[i] > populationFitness[j]){
      winner = population[j];
    }

    newPopulation.push(winner);
  }

  while(newPopulation.length < 15){
    newPopulation.push(crossover(
      newPopulation[Math.randomInt(newPopulation.length)],
      newPopulation[Math.randomInt(newPopulation.length)],
    ));
  }

  while(newPopulation.length < 18){
    newPopulation.push(mutate(
      newPopulation[Math.randomInt(newPopulation.length)]
    ));
  }

  while(newPopulation.length < 20){
    newPopulation.push(generateRandom());
  }

  population = newPopulation;
  console.log(population);
}


console.log(ev);
await Evaluator.evaluate(population);
