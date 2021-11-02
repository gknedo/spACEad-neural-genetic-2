Math.randomArbitrary = function(min, max) {
  return Math.random() * (max - min) + min;
}

Math.sigmoid = function(t) {
  return 1/(1+Math.pow(Math.E, -t));
}

Math.tansig = function(t) {
  return 2/(1+Math.pow(Math.E, -2*t)) -1;
}

Math.randomInt = function(max) {
  return Math.floor(Math.random() * max);
}

Math.shuffleArray = function(array) {
  return array
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)
}

export default Math;
