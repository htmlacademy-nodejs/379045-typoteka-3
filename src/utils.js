'use strict';

const generateRandomInt = (min, max) => {
  const length = max - min + 1;
  return Math.floor(Math.random() * length + min);
};

const getRandomIndexArr = (arr) => {
  return generateRandomInt(0, arr.length - 1);
};

const getRandomElementArr = (arr) => {
  return arr[getRandomIndexArr(arr)];
};

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

module.exports = {
  generateRandomInt,
  getRandomIndexArr,
  getRandomElementArr,
  getRandomDate,

};
