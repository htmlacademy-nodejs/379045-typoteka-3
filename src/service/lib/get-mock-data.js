'use strict';

const fs = require(`fs`).promises;
const {FILE_NAME} = require(`../../const`);
const FILE_ERROR = `ENOENT`;

let data = [];

const getMockData = async () => {

  if (data.length > 0) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(FILE_NAME);
    data = !fileContent.length ? [] : JSON.parse(fileContent);

  } catch (err) {

    if (err.code === FILE_ERROR) {
      data = [];
    }

    throw err;
  }

  return data;
};

module.exports = getMockData;
