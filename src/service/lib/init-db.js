"use strict";

const defineModels = require(`../models`);

module.exports = async (sequelize, {categories, articles}) => {
  const {Category, Article} = defineModels(sequelize);
  await sequelize.authenticate();
  await sequelize.sync({force: true});

  await Category.bulkCreate(categories);

  const articlePromises = articles.map(async (article) => {
    const articleEntity = await Article.create(article);

    await articleEntity.addCategories(article.categories);
  });

  await Promise.all(articlePromises);
};
