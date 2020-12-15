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

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = getRandomIndexArr(someArray);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

module.exports = {
  generateRandomInt,
  getRandomIndexArr,
  getRandomElementArr,
  getRandomDate,
  shuffle
};
