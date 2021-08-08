'use strict';

const Joi = require(`joi`);

const {HttpCode} = require(`../../const`);

const schema = Joi.object({
  title: Joi.string().min(10).max(100).required(),
  img: Joi.string().required(),
  categories: Joi.array().items(Joi.number().integer().positive()).min(1).required(),
  announce: Joi.string().min(10).max(50).required(),
  fullText: Joi.string().min(50).max(1000).required(),
  createdDate: Joi.string().required(),
  comments: Joi.array()
});

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const {error} = schema.validate(newArticle);

  if (error) {
    return res.status(HttpCode.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};
