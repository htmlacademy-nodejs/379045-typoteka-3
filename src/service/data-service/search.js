'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  getAll(searchQuery) {
    return this._articles.filter((article) => article.title.includes(searchQuery));
  }

}

module.exports = SearchService;
