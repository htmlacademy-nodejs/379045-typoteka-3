'use strict';

const express = require(`express`);
const request = require(`supertest`);

const article = require(`./article`);
const DataService = require(`../data-service/article`);

const {HttpCode} = require(`../../const`);

const createApi = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(getMockData()));
  app.use(express.json());
  article(app, new DataService(cloneData));

  return app;
};

describe(`API returns a list of all articles`, () => {
  const app = createApi();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 3 articles`, () => expect(response.body.length).toBe(3));

  test(`First offer's id equals "zKwsS9YujJ69sx4CPfs1O"`, () => expect(response.body[0].id).toBe(`zKwsS9YujJ69sx4CPfs1O`));
});

describe(`API returns an article with given id`, () => {
  const app = createApi();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/zKwsS9YujJ69sx4CPfs1O`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Ёлки.История деревьев"`, () => expect(response.body.title).toBe(`Ёлки.История деревьев`));

});

describe(`API creates an article if data is valid`, () => {
  const app = createApi();
  let response;

  const newArticle = {
    title: `Article title`,
    announce: `Article announce`,
    fullText: `Article full text!`,
    img: `art.jpg`,
    category: [`За жизнь`]
  };

  beforeAll(async () => {
    response = await request(app).post(`/articles`).send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
});

describe(`API refuses to create an article if data is invalid`, () => {
  const app = createApi();

  const newArticle = {
    title: `Article title`,
    announce: `Article announce`,
    fullText: `Article full text!`,
    img: `art.jpg`,
    category: [`За жизнь`]
  };

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badItem = {...newArticle};
      delete badItem[key];
      await request(app).post(`/articles`).send(badItem).expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent article`, () => {
  const app = createApi();
  let response;

  const newArticle = {
    title: `Article title`,
    announce: `Article announce`,
    fullText: `Article full text!`,
    img: `art.jpg`,
    category: [`Музыка`]
  };

  beforeAll(async () => {
    response = await request(app).put(`/articles/zKwsS9YujJ69sx4CPfs1O`).send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/zKwsS9YujJ69sx4CPfs1O`)
    .expect((res) => expect(res.body.title).toBe(`Article title`)));
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  const app = createApi();

  const newArticle = {
    title: `Article title`,
    announce: `Article announce`,
    fullText: `Article full text!`,
    img: `art.jpg`,
    category: [`Музыка`]
  };

  return request(app).put(`/articles/none`).send(newArticle).expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {
  const app = createApi();

  const invalidArticle = {
    title: `Article invalid`,
    announce: `Article announce`,
    fullText: `Article full text!`,
  };

  return request(app).put(`/articles/zKwsS9YujJ69sx4CPfs1O`).send(invalidArticle).expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {
  const app = createApi();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/zKwsS9YujJ69sx4CPfs1O`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`zKwsS9YujJ69sx4CPfs1O`));

  test(`Article count is 2 now`, () => {
    return request(app).get(`/articles`).expect((res) => expect(res.body.length).toBe(2));
  });
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
  const app = createApi();

  return request(app).post(`/articles/none/comments`).send({text: `Неважно`}).expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete non-existent comment`, () => {
  const app = createApi();

  return request(app).delete(`/articles/zKwsS9YujJ69sx4CPfs1O/comments/none`).expect(HttpCode.NOT_FOUND);

});


function getMockData() {
  return ([
    {
      "id": `zKwsS9YujJ69sx4CPfs1O`,
      "title": `Ёлки.История деревьев`,
      "createdDate": `2020-12-13T19:46:47.385Z`,
      "announce": `Золотое сечение — соотношение двух величин, гармоническая пропорция. Программировать не настолько сложно, как об этом говорят. Альбом стал настоящим открытием года.Мощные гитарные рифы и скоростные соло - партии не дадут заскучать. Это один из лучших рок - музыкантов. Этот смартфон — настоящая находка.Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Освоить вёрстку несложно.Возьмите книгу новую книгу и закрепите все упражнения на практике. Бороться с прокрастинацией несложно.Просто действуйте.Маленькими шагами. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Простые ежедневные упражнения помогут достичь успеха. Собрать камни бесконечности легко, если вы прирожденный герой. Как начать действовать ? Для начала просто соберитесь. Процессор заслуживает особого внимания.Он обязательно понравится геймерам со стажем. Вы можете достичь всего.Стоит только немного постараться и запастись книгами. Он написал больше 30 хитов. Достичь успеха помогут ежедневные повторения. Рок - музыка всегда ассоциировалась с протестами.Так ли это на самом деле ?`,
      "fullText": `Из под его пера вышло 8 платиновых альбомов. Процессор заслуживает особого внимания.Он обязательно понравится геймерам со стажем. Это один из лучших рок - музыкантов. Ёлки — это не просто красивое дерево.Это прочная древесина. Программировать не настолько сложно, как об этом говорят. Освоить вёрстку несложно.Возьмите книгу новую книгу и закрепите все упражнения на практике. Золотое сечение — соотношение двух величин, гармоническая пропорция. Он написал больше 30 хитов. Вы можете достичь всего.Стоит только немного постараться и запастись книгами. Этот смартфон — настоящая находка.Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Собрать камни бесконечности легко, если вы прирожденный герой. Первая большая ёлка была установлена только в 1938 году.`,
      "category": [
        `Музыка`,
        `IT`,
        `Без рамки`,
        `За жизнь`,
        `Программирование`
      ],
      "comments": [
        {
          "id": `HY9LBaOpBqtqPj7PPxquk`,
          "text": `Это где ж такие красоты?`
        },
        {
          "id": `VHpL2GUNhOLskcGpKd6NQ`,
          "text": `Хочу такую же футболку :-)`
        },
        {
          "id": `n5zOE0mT7bqppUDzuunN_`,
          "text": `Планируете записать видосик на эту тему?`
        }
      ]
    },
    {
      "id": `vvh_bd5JIPF_Zu9-jylrR`,
      "title": `Борьба с прокрастинацией`,
      "createdDate": `2020-10-08T04:09:58.120Z`,
      "announce": `Простые ежедневные упражнения помогут достичь успеха. Достичь успеха помогут ежедневные повторения. Как начать действовать ? Для начала просто соберитесь. Игры и программирование разные вещи.Не стоит идти в программисты, если вам нравятся только игры. Он написал больше 30 хитов. Бороться с прокрастинацией несложно.Просто действуйте.Маленькими шагами. Вы можете достичь всего.Стоит только немного постараться и запастись книгами. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Процессор заслуживает особого внимания.Он обязательно понравится геймерам со стажем. Ёлки — это не просто красивое дерево.Это прочная древесина. Из под его пера вышло 8 платиновых альбомов. Собрать камни бесконечности легко, если вы прирожденный герой. Это один из лучших рок - музыкантов. Первая большая ёлка была установлена только в 1938 году. Рок - музыка всегда ассоциировалась с протестами.Так ли это на самом деле ? Освоить вёрстку несложно.Возьмите книгу новую книгу и закрепите все упражнения на практике. Этот смартфон — настоящая находка.Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
      "fullText": `Первая большая ёлка была установлена только в 1938 году. Этот смартфон — настоящая находка.Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Бороться с прокрастинацией несложно.Просто действуйте.Маленькими шагами. Освоить вёрстку несложно.Возьмите книгу новую книгу и закрепите все упражнения на практике. Простые ежедневные упражнения помогут достичь успеха. Вы можете достичь всего.Стоит только немного постараться и запастись книгами. Игры и программирование разные вещи.Не стоит идти в программисты, если вам нравятся только игры. Это один из лучших рок - музыкантов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать ? Для начала просто соберитесь. Процессор заслуживает особого внимания.Он обязательно понравится геймерам со стажем. Собрать камни бесконечности легко, если вы прирожденный герой.`,
      "category": [
        `Разное`,
        `Железо`,
        `Кино`,
        `Музыка`,
        `Программирование`,
        `IT`
      ],
      "comments": [
        {
          "id": `SnfBhtDrVkod4UbdMEz2h`,
          "text": `Планируете записать видосик на эту тему?`
        },
        {
          "id": `wqZLSjLeHy4C5UrHztD9k`,
          "text": `Мне кажется или я уже читал это где-то?`
        },
        {
          "id": `XZdoamTdWp6ISloplpVtt`,
          "text": `Мне кажется или я уже читал это где-то?`
        },
        {
          "id": `TNeC3kqPa_j48CqeAIR_Z`,
          "text": `Это где ж такие красоты?`
        }
      ]
    },
    {
      "id": `yWUFq0ayTaCzaF6tCBFaE`,
      "title": `Рок — это протест`,
      "createdDate": `2020-12-13T19:46:47.385Z`,
      "announce": `Альбом стал настоящим открытием года.Мощные гитарные рифы и скоростные соло - партии не дадут заскучать. Как начать действовать ? Для начала просто соберитесь. Ёлки — это не просто красивое дерево.Это прочная древесина. Программировать не настолько сложно, как об этом говорят. Бороться с прокрастинацией несложно.Просто действуйте.Маленькими шагами. Рок - музыка всегда ассоциировалась с протестами.Так ли это на самом деле ? Первая большая ёлка была установлена только в 1938 году. Собрать камни бесконечности легко, если вы прирожденный герой. Вы можете достичь всего.Стоит только немного постараться и запастись книгами. Он написал больше 30 хитов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Из под его пера вышло 8 платиновых альбомов. Этот смартфон — настоящая находка.Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Освоить вёрстку несложно.Возьмите книгу новую книгу и закрепите все упражнения на практике. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Игры и программирование разные вещи.Не стоит идти в программисты, если вам нравятся только игры. Это один из лучших рок - музыкантов. Процессор заслуживает особого внимания.Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения. Простые ежедневные упражнения помогут достичь успеха.`,
      "fullText": `Как начать действовать ? Для начала просто соберитесь. Процессор заслуживает особого внимания.Он обязательно понравится геймерам со стажем. Это один из лучших рок - музыкантов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Освоить вёрстку несложно.Возьмите книгу новую книгу и закрепите все упражнения на практике. Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи.Не стоит идти в программисты, если вам нравятся только игры. Вы можете достичь всего.Стоит только немного постараться и запастись книгами. Золотое сечение — соотношение двух величин, гармоническая пропорция. Простые ежедневные упражнения помогут достичь успеха. Достичь успеха помогут ежедневные повторения.`,
      "category": [
        `За жизнь`,
        `Без рамки`,
        `Музыка`,
        `Разное`,
        `Кино`,
        `Железо`
      ],
      "comments": [
        {
          "id": `KyVlmXIXb66fhvfbd5pMn`,
          "text": `Это где ж такие красоты?`
        },
        {
          "id": `sjCWs4SwJ5yi3bKlJdpRj`,
          "text": `Мне кажется или я уже читал это где-то?`
        },
        {
          "id": `0AABMKn7ZH7_kycVRp1ov`,
          "text": `Планируете записать видосик на эту тему?`
        },
        {
          "id": `ePO6fQHnKsjFCyGlm3yAq`,
          "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
        },
        {
          "id": `ETM-8Wqx8ir_y8UKfm9yU`,
          "text": `Планируете записать видосик на эту тему?`
        },
        {
          "id": `-MPVjOQo_M72qw9H_OTO9`,
          "text": `Планируете записать видосик на эту тему?`
        }
      ]
    }
  ]);
}
