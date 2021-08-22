'use strict';

const Joi = require(`joi`);

const validator = require(`../lib/validator`);

const schema = Joi.object({
  title: Joi.string().min(10).max(100).required(),
  picture: Joi.string(),
  categories: Joi.array().items(Joi.number().integer().positive()).min(1).required(),
  announce: Joi.string().min(10).max(50).required(),
  fullText: Joi.string().min(50).max(1000).required(),
  createdDate: Joi.string().required()
});

module.exports = validator(schema);
