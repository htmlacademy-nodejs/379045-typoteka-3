'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();
const api = require(`../api`).getAPI();


mainRouter.get(`/`, async (req, res) => {
  const [articles, categories] = await Promise.all([api.getArticles(), api.getCategories(true)]);

  res.render(`main`, {articles, categories});
});


mainRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles();
  const comments = articles.slice(0, 3).flatMap((article) => article.comments);
  res.render(`comments`, {comments});
});

mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));

mainRouter.get(`/search`, async (req, res) => {
  try {
    const {search} = req.query;
    const results = await api.search(search);
    res.render(`search`, {results});
  } catch (err) {
    res.render(`search`, {results: []});
  }
});

mainRouter.get(`/categories`, (req, res) => res.render(`articles-by-category`));

module.exports = mainRouter;
