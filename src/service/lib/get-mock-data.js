'use strict';

const fs = require(`fs`).promises;
const {FILE_NAME} = require(`../../const`);

let data = [];

const getMockData = async () => {

  if (data.length > 0) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(FILE_NAME);
    data = JSON.parse(fileContent);

  } catch (err) {
    throw err;
  }

  return data;
};

module.exports = getMockData;
