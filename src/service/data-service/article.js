'use strict';

const Alias = require(`../models/alias`);

class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Category = sequelize.models.Category;
  }

  async create(data) {
    const article = await this._Article.create(data);
    await article.addCategories(data.categories);
    return article;
  }

  async drop(id) {
    const deletedRows = await this._Article.destroy({
      where: {id}
    });
    return !!deletedRows;
  }

  findOne(id) {
    return this._Article.findByPk(id, {include: [Alias.CATEGORIES]});
  }

  async update(id, data) {

    const [article, categories] = await Promise.all([
      this._Article.findOne({where: {id}}),
      this._Category.findAll({where: {id: data.categories}})
    ]);

    await article.setCategories(categories);
    await article.update(data);

    return true;
  }

  async findAll(needComments) {
    const include = [Alias.CATEGORIES];
    if (needComments) {
      include.push(Alias.COMMENTS);
    }
    const articles = await this._Article.findAll({include});
    return articles.map((item) => item.get());
  }

  async findPage({limit, offset}) {
    const {count, rows} = await this._Article.findAndCountAll({
      limit,
      offset,
      include: [Alias.CATEGORIES],
      distinct: true
    });
    return {count, articles: rows};
  }

}

module.exports = ArticleService;
