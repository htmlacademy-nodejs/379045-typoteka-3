'use strict';

const Router = require(`express`);
const articles = require(`../api/article`);
const categories = require(`../api/category`);
const search = require(`../api/search`);

const {
  ArticleService,
  CategoryService,
  SearchService,
  CommentService
} = require(`../data-service`);

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);

const app = new Router();

defineModels(sequelize);

(async () => {
  articles(app, new ArticleService(sequelize), new CommentService(sequelize));
  categories(app, new CategoryService(sequelize));
  search(app, new SearchService(sequelize));
})();

module.exports = app;
