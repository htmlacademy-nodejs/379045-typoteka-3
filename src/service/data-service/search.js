'use strict';

const {Op} = require(`sequelize`);
const Alias = require(`../models/alias`);
class SearchService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
  }

  async findAll(searchQuery) {
    const articles = await this._Article.findAll({
      where: {
        title: {
          [Op.substring]: searchQuery
        }
      },
      include: [Alias.CATEGORIES],
    });
    return articles.map((article) => article.get());
  }

}

module.exports = SearchService;
