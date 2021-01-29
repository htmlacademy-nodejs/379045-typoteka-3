'use strict';

const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);
const chalk = require(`chalk`);
const {generateRandomInt, getRandomElementArr, getRandomDate, shuffle} = require(`../../utils`);
const {ExitCode, FILE_NAME} = require(`../../const`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const MAX_COMMENTS_COUNT = 6;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const generateComments = (count, comments) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(),
    text: shuffle(comments).slice(0, 1).join(` `)
  }));
};

const generatePosts = (count, titles, categories, sentences, dates, comments = []) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(),
    title: getRandomElementArr(titles),
    createdDate: getRandomElementArr(dates),
    announce: shuffle(sentences).slice(generateRandomInt(0, 5)).join(` `),
    fullText: shuffle(sentences).slice(generateRandomInt(0, sentences.length - 1)).join(` `),
    сategory: shuffle(categories).slice(generateRandomInt(0, categories.length - 1)),
    comments: generateComments(generateRandomInt(1, MAX_COMMENTS_COUNT), comments)
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
    const comments = await readDataFromFile(FILE_COMMENTS_PATH);

    if (counter > MAX_COUNT) {
      console.error(`Не больше 1000 публикаций`);
      process.exit(ExitCode.error);
    }

    const postsData = generatePosts(counter, titles, categories, sentences, createdDates, comments);

    writeJsonFile(FILE_NAME, postsData);
  }
};
