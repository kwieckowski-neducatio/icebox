export default {
  scale: 4,
  interval: 10,
  randomBetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
};
