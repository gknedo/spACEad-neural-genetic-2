// module aliases
import { randomColor} from 'randomcolor';
import Evaluator from './Evaluator';
import Math from './Math'

let genColor = randomColor();
let idCounter = 0;

function generateRandom() {
  return {
    id: idCounter++,
    fillStyle: genColor,
    weights: [
      new Array(3).fill(0).map(() => Math.randomArbitrary(-1,1)),
      new Array(3).fill(0).map(() => Math.randomArbitrary(-1,1)),
    ],
  }
}

function crossoverValue(a, b){
  const random = Math.random() * 2 - 0.5;
  return ((a-b) * random) + b;
}

function crossover(popA, popB) {
  return {
    id: idCounter++,
    fillStyle: genColor,
    weights: [
      popA.weights[0].map((value, index) => crossoverValue(value, popB.weights[0][index])),
      popA.weights[1].map((value, index) => crossoverValue(value, popB.weights[1][index])),
    ],
  }
}

function mutate(pop) {
  const newPop = {
    id: idCounter++,
    fillStyle: genColor,
    weights: [
      [...(pop.weights[0])],
      [...(pop.weights[1])],
    ],
  };

  const mutP = Math.randomInt(2);
  const mutW = Math.randomInt(3);
  newPop.weights[mutP][mutW] = Math.randomArbitrary(-1,1);

  return newPop;
}

let population = Array(80).fill(0).map(() => generateRandom());
let targetPosition = {x: 400, y: 600};
let generation = 0;
while(generation < 100) {
  generation++;
  if(generation % 3 == 0) {
    targetPosition = {
      x: Math.randomInt(700) + 50,
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

  console.log(newPopulation);

  while(newPopulation.length < 60){
    newPopulation.push(crossover(
      newPopulation[Math.randomInt(newPopulation.length)],
      newPopulation[Math.randomInt(newPopulation.length)],
    ));
  }

  while(newPopulation.length < 75){
    newPopulation.push(mutate(
      newPopulation[Math.randomInt(newPopulation.length)]
    ));
  }

  while(newPopulation.length < 5){
    newPopulation.push(generateRandom());
  }

  population = newPopulation;
}

await Evaluator.evaluate(population);
