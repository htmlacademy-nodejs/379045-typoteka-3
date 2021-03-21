'use strict';
class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
  }

  async findAll() {
    return this._Category.findAll({raw: true});
  }

}

module.exports = CategoryService;
