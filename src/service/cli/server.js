'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {HttpCode} = require(`../../const`);
const DEFAULT_PORT = 3000;
const FILE_ERROR = `ENOENT`;
const getMockData = require(`../lib/get-mock-data`);

const app = express();

app.use(express.json());

app.get(`/posts`, async (req, res) => {
  try {
    const mocks = await getMockData();
    res.json(mocks);

  } catch (err) {

    if (err.code === FILE_ERROR) {
      res.status(HttpCode.OK).send([]);
      return;
    }

    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(`Not Found`);
});


module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`, err);
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};
