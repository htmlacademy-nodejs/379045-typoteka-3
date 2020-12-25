'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {generateRandomInt, getRandomElementArr, getRandomDate, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../const`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const generatePosts = (count, titles, categories, sentences, dates) => {
  return Array(count).fill({}).map(() => ({
    title: getRandomElementArr(titles),
    createdDate: getRandomElementArr(dates),
    announce: shuffle(sentences).slice(generateRandomInt(0, 5)).join(` `),
    fullText: shuffle(sentences).slice(generateRandomInt(0, sentences.length - 1)).join(` `),
    сategory: shuffle(categories).slice(generateRandomInt(0, categories.length - 1))
  }));
};

const readDataFromFile = async (filePath) => {

  try {
    const data = await fs.readFile(filePath, `utf8`);
    return data.split(`\n`).filter((item) => item !== ``);
  } catch (err) {
    console.error(chalk.red(err));
    throw err;
  }
};

const writeJsonFile = async (fileName, data) => {

  const jsonData = JSON.stringify(data);

  try {
    await fs.writeFile(fileName, jsonData);
    return console.info(chalk.green(`Operation success. File created.`));
  } catch (err) {
    console.error(chalk.red(`Can't write data to file...`));
    throw err;
  }

};

module.exports = {
  name: `--generate`,
  async run(args = []) {
    const [count] = args;
    const counter = parseInt(count, 10) || DEFAULT_COUNT;
    const sentences = await readDataFromFile(FILE_SENTENCES_PATH);
    const titles = await readDataFromFile(FILE_TITLES_PATH);
    const categories = await readDataFromFile(FILE_CATEGORIES_PATH);
    const createdDates = titles.map(() => getRandomDate(new Date(2020, 9, 1), new Date()));

    if (counter > MAX_COUNT) {
      console.error(`Не больше 1000 публикаций`);
      process.exit(ExitCode.error);
    }

    const postsData = generatePosts(counter, titles, categories, sentences, createdDates);

    writeJsonFile(FILE_NAME, postsData);
  }
};
