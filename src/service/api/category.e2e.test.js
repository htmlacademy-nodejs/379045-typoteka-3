'use strict';

const express = require(`express`);
const supertest = require(`supertest`);
const Sequelize = require(`sequelize`);

const category = require(`./category`);
const DataService = require(`../data-service/category`);
const initDB = require(`../lib/init-db`);

const {HttpCode} = require(`../../const`);

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

const app = express();

app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {categories: mockCategories, articles: mockArticles}).catch((err) => console.error(err));
  category(app, new DataService(mockDB));
});

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await supertest(app).get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 3 categories`, () => expect(response.body.length).toBe(3));

  test(`Category names are "Программирование", "Деревья", "Кино"`,
      () => expect(response.body.map((it) => it.name))
        .toEqual(expect.arrayContaining([`Программирование`, `Деревья`, `Кино`])));
});

const mockCategories = [
  {id: 1, name: `Программирование`},
  {id: 2, name: `Кино`},
  {id: 3, name: `Деревья`},
];

const mockArticles = [
  {
    "title": `Лучшие рок - музыканты 20 - века`,
    "announce": `Он написал больше 30 хитов. Это один из лучших рок - музыкантов. Вы можете достичь всего.Стоит только немного постараться и запастись книгами. Этот смартфон — настоящая находка.Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Освоить вёрстку несложно.Возьмите книгу новую книгу и закрепите все упражнения на практике. Ёлки — это не просто красивое дерево.Это прочная древесина. Достичь успеха помогут ежедневные повторения. Первая большая ёлка была установлена только в 1938 году. Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха. Игры и программирование разные вещи.Не стоит идти в программисты, если вам нравятся только игры. Как начать действовать ? Для начала просто соберитесь. Собрать камни бесконечности легко, если вы прирожденный герой. Процессор заслуживает особого внимания.Он обязательно понравится геймерам со стажем. Бороться с прокрастинацией несложно.Просто действуйте.Маленькими шагами. Рок - музыка всегда ассоциировалась с протестами.Так ли это на самом деле ? Из под его пера вышло 8 платиновых альбомов. Альбом стал настоящим открытием года.Мощные гитарные рифы и скоростные соло - партии не дадут заскучать. Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    "fullText": `Процессор заслуживает особого внимания.Он обязательно понравится геймерам со стажем. Простые ежедневные упражнения помогут достичь успеха. Собрать камни бесконечности легко, если вы прирожденный герой. Это один из лучших рок - музыкантов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Как начать действовать ? Для начала просто соберитесь.`,
    "categories": [mockCategories[0].id],
    "comments": [
      {"text": `Это где ж такие красоты?`},
      {"text": `Это где ж такие красоты?`},
      {"text": `Совсем немного...`},
      {"text": `Совсем немного...`},
      {"text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`},
      {"text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`}
    ]
  },
  {
    "title": `Как собрать камни бесконечности`,
    "announce": `Он написал больше 30 хитов. Игры и программирование разные вещи.Не стоит идти в программисты, если вам нравятся только игры. Этот смартфон — настоящая находка.Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Рок - музыка всегда ассоциировалась с протестами.Так ли это на самом деле ? Освоить вёрстку несложно.Возьмите книгу новую книгу и закрепите все упражнения на практике. Первая большая ёлка была установлена только в 1938 году. Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко, если вы прирожденный герой. Простые ежедневные упражнения помогут достичь успеха. Процессор заслуживает особого внимания.Он обязательно понравится геймерам со стажем. Из под его пера вышло 8 платиновых альбомов. Бороться с прокрастинацией несложно.Просто действуйте.Маленькими шагами. Как начать действовать ? Для начала просто соберитесь. Это один из лучших рок - музыкантов.`,
    "fullText": `Программировать не настолько сложно, как об этом говорят. Это один из лучших рок - музыкантов. Бороться с прокрастинацией несложно.Просто действуйте.Маленькими шагами. Из под его пера вышло 8 платиновых альбомов. Простые ежедневные упражнения помогут достичь успеха. Процессор заслуживает особого внимания.Он обязательно понравится геймерам со стажем. Первая большая ёлка была установлена только в 1938 году. Он написал больше 30 хитов. Игры и программирование разные вещи.Не стоит идти в программисты, если вам нравятся только игры. Альбом стал настоящим открытием года.Мощные гитарные рифы и скоростные соло - партии не дадут заскучать. Вы можете достичь всего.Стоит только немного постараться и запастись книгами. Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко, если вы прирожденный герой. Этот смартфон — настоящая находка.Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Освоить вёрстку несложно.Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    "categories": [mockCategories[1].id],
    "comments": [
      {"text": `Совсем немного...`}
    ]
  },
  {
    "title": `Ёлки.История деревьев`,
    "announce": `Освоить вёрстку несложно.Возьмите книгу новую книгу и закрепите все упражнения на практике. Простые ежедневные упражнения помогут достичь успеха. Первая большая ёлка была установлена только в 1938 году. Программировать не настолько сложно, как об этом говорят. Рок - музыка всегда ассоциировалась с протестами.Так ли это на самом деле ? Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Процессор заслуживает особого внимания.Он обязательно понравится геймерам со стажем. Этот смартфон — настоящая находка.Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Из под его пера вышло 8 платиновых альбомов. Игры и программирование разные вещи.Не стоит идти в программисты, если вам нравятся только игры. Это один из лучших рок - музыкантов. Собрать камни бесконечности легко, если вы прирожденный герой. Альбом стал настоящим открытием года.Мощные гитарные рифы и скоростные соло - партии не дадут заскучать. Ёлки — это не просто красивое дерево.Это прочная древесина. Вы можете достичь всего.Стоит только немного постараться и запастись книгами. Он написал больше 30 хитов. Достичь успеха помогут ежедневные повторения.`,
    "fullText": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Из под его пера вышло 8 платиновых альбомов. Достичь успеха помогут ежедневные повторения. Освоить вёрстку несложно.Возьмите книгу новую книгу и закрепите все упражнения на практике. Альбом стал настоящим открытием года.Мощные гитарные рифы и скоростные соло - партии не дадут заскучать. Бороться с прокрастинацией несложно.Просто действуйте.Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Рок - музыка всегда ассоциировалась с протестами.Так ли это на самом деле ? Как начать действовать ? Для начала просто соберитесь. Это один из лучших рок - музыкантов. Вы можете достичь всего.Стоит только немного постараться и запастись книгами. Игры и программирование разные вещи.Не стоит идти в программисты, если вам нравятся только игры. Он написал больше 30 хитов. Этот смартфон — настоящая находка.Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Программировать не настолько сложно, как об этом говорят. Процессор заслуживает особого внимания.Он обязательно понравится геймерам со стажем. Ёлки — это не просто красивое дерево.Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    "categories": [mockCategories[2].id, mockCategories[1].id, mockCategories[0].id],
    "comments": [
      {"text": `Хочу такую же футболку :-)`},
      {"text": `Хочу такую же футболку :-)`},
      {"text": `Хочу такую же футболку :-)`},
      {"text": `Плюсую, но слишком много буквы!`},
      {"text": `Планируете записать видосик на эту тему?`}
    ]
  }
];
