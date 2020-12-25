'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {FILE_NAME, HttpCode} = require(`../../const`);
const DEFAULT_PORT = 3000;

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>Типотека</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;

  switch (req.url) {

    case `/`:

      try {
        const fileContent = await fs.readFile(FILE_NAME);
        const mocks = JSON.parse(fileContent);
        const listItems = mocks.map((item) => `<li>${item.title}</li>`).join(``);
        const list = `<ul>${listItems}</ul>`;

        sendResponse(res, HttpCode.OK, list);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      }
      break;

    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
  }
};

const httpServer = http.createServer(onClientConnect);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    httpServer
      .listen(port)
      .on(`listening port: ${port}`, (err) => {
        if (err) {
          return console.error(`Ошибка при создании сервера`, err);
        }

        return console.info(chalk.green(`Ожидаю соединений на ${port}`));
      });
  }
};
