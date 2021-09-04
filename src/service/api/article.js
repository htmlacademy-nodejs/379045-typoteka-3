'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../const`);
const articleValidator = require(`../middlewares/article-validator`);
const commentValidator = require(`../middlewares/comment-validator`);
const routeParamsValidator = require(`../middlewares/route-params-validator`);

module.exports = (app, service, commentService) => {

  const route = new Router();

  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const {offset, limit, comments} = req.query;
    let result;
    if (limit || offset) {
      result = await service.findPage({limit, offset});
    } else {
      result = await service.findAll(comments);
    }

    return res.status(HttpCode.OK).json(result);
  });

  route.get(`/:articleId`, routeParamsValidator, async (req, res) => {
    const {articleId} = req.params;
    const article = await service.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).send(article);
  });

  route.post(`/`, articleValidator, async (req, res) => {
    const article = await service.create(req.body);

    return res.status(HttpCode.CREATED).json(article);
  });

  route.put(`/:articleId`, articleValidator, async (req, res) => {
    const {articleId} = req.params;

    const updated = await service.update(articleId, req.body);

    if (!updated) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).json(`Updated`);

  });

  route.delete(`/:articleId`, routeParamsValidator, async (req, res) => {
    const {articleId} = req.params;
    const article = await service.drop(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).json(article);

  });

  route.get(`/:articleId/comments`, routeParamsValidator, async (req, res) => {
    const {articleId} = req.params;
    const comments = await commentService.findAll(articleId);

    return res.status(HttpCode.OK).json(comments);

  });

  route.delete(`/:articleId/comments/:commentId`, routeParamsValidator, async (req, res) => {
    const {articleId, commentId} = req.params;

    try {
      const deletedComment = await commentService.drop(commentId);
      return res.status(HttpCode.OK).json(deletedComment);
    } catch (err) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

  });

  route.post(`/:articleId/comments`, commentValidator, async (req, res) => {
    const {articleId} = req.params;

    try {
      const newComment = await commentService.create(articleId, req.body);
      return res.status(HttpCode.OK).json(newComment);
    } catch (err) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

  });
};
