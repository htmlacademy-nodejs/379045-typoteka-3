'use strict';

const {HttpCode} = require(`../../const`);

module.exports = (schema) => {
  return (req, res, next) => {
    const {error} = schema.validate(req.body);

    if (error) {
      return res.status(HttpCode.BAD_REQUEST)
        .send(error.details.map((err) => err.message).join(`\n`));
    }

    return next();
  };
};
