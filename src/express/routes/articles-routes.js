'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();
const api = require(`../api`).getAPI();

articlesRouter.get(`/category/:id`, (req, res) => res.send(`/articles/category/${req.params.id}`));
articlesRouter.get(`/add`, (req, res) => res.send(`/articles/add`));

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([api.getArticle(id), api.getCategories()]);
  res.render(`new-post`, {article, categories});
});

articlesRouter.get(`/:id`, async (req, res) => {
  const [article, categories] = await Promise.all([api.getArticle(req.params.id), api.getCategories()]);
  res.render(`post`, {article, categories});
});

module.exports = articlesRouter;
