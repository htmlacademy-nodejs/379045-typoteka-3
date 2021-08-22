'use strict';

const Joi = require(`joi`);
const validator = require(`../lib/validator`);

const schema = Joi.object({
  text: Joi.string().min(20).required()
});

module.exports = validator(schema);
