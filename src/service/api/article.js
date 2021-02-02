'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../const`);
const arcicleValidator = require(`../middlewares/article-validator`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = service.getAll();
    return res.status(HttpCode.OK).json(articles);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = service.getOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).send(article);
  });

  route.post(`/`, arcicleValidator, (req, res) => {
    const article = service.create(req.body);

    return res.status(HttpCode.CREATED).json(article);
  });

  route.put(`/:articleId`, arcicleValidator, (req, res) => {
    const {articleId} = req.params;

    const existArticle = service.getOne(articleId);

    if (!existArticle) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    const updatedArticle = service.update(articleId, req.body);

    return res.status(HttpCode.OK).json(updatedArticle);

  });

  route.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = service.delete(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).json(article);

  });

  route.get(`/:articleId/comments`, (req, res) => {
    const {articleId} = req.params;
    const article = service.getOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).json(article.comments);

  });

  route.delete(`/:articleId/comments/:commentId`, (req, res) => {
    const {articleId, commentId} = req.params;
    const deletedComment = service.deletedComment(articleId, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).json(deletedComment);

  });

  route.post(`/:articleId/comments`, (req, res) => {
    const {articleId} = req.params;
    const newComment = service.createComment(articleId, req.body);

    if (!newComment) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).json(newComment);

  });
};
