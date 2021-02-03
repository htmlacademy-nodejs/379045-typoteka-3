'use strict';

const Router = require(`express`);
const articles = require(`../api/article`);
const categories = require(`../api/category`);
const search = require(`../api/search`);

const getMockData = require(`../lib/get-mock-data`);

const {ArticleService, CategoryService, SearchService} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  articles(app, new ArticleService(mockData));
  categories(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
})();

module.exports = app;
