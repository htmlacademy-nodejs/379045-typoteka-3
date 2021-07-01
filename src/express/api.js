'use strict';

const axios = require(`axios`);

const TIMEOUT = 1000;

const port = process.env.API_PORT || 3000;
const defaultUrl = `http://localhost:${port}/api/`;


class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({baseURL, timeout});
  }

  async _load(url, options) {
    const res = await this._http.request({url, ...options});

    return res.data;
  }

  getArticles({offset, limit, comments} = {}) {
    return this._load(`/articles`, {params: {offset, limit, comments}});
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  async createArticle(data) {
    return this._load(`articles/`, {
      method: `POST`,
      data
    });
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }

  getCategories(count) {
    return this._load(`/categories`, {params: {count}});
  }

}

const instance = new API(defaultUrl, TIMEOUT);

module.exports = {
  API,
  getAPI: () => instance
};
