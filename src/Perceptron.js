const Perceptron = {};

Perceptron.run = function(inputs, weights) {
  let sum = 0;
  for(let i=1; i<weights.length; i++){
    sum += inputs[i-1] * weights[i]
  }
  return Math.sigmoid(sum);
}

export default Perceptron;
