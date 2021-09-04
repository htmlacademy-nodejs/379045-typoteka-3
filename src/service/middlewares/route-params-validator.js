'use strict';

const Joi = require(`joi`);
const validator = require(`../lib/validator`);

const schema = Joi.object({
  articleId: Joi.number().integer().min(1),
  commentId: Joi.number().integer().min(1)
});

module.exports = validator(schema);
