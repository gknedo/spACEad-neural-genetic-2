const Perceptron = {};

Perceptron.run = function(inputs, weights) {
  let sum = weights[0];
  for(let i=1; i<weights.length; i++){
    sum += inputs[i-1] * weights[i]
  }
  return Math.tansig(sum);
}

export default Perceptron;
