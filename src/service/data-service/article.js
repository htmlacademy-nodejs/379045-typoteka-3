'use strict';

const {nanoid} = require(`nanoid`);

class ArcicleService {
  constructor(articles) {
    this._articles = articles;
  }

  getAll() {
    return this._articles.slice();
  }

  getOne(id) {
    return this._articles.find((article) => article.id === id);
  }

  getComments(postId) {
    const post = this.findOne(postId);

    return post.comments;
  }

  create(post) {
    const newPost = Object.assign({id: nanoid(), comments: []}, post);
    this._articles.push(newPost);

    return newPost;
  }

  createComment(id, comment) {
    const post = this.findOne(id);
    comment.id = nanoid();
    post.comments.push(comment);

    return comment;
  }

  update(id, post) {
    const oldPost = this.findOne(id);

    return Object.assign(oldPost, post);
  }

  delete(id) {
    const index = this._articles.findIndex((article) => article.id === id);

    const deletedPost = this._articles.splice(index, 1);

    return deletedPost[0];
  }

  geleteComment(postId, commentId) {
    const post = this.findOne(postId);
    const commentIndex = post.comments.findIndex((comment) => comment.id === commentId);
    const deletedComment = post.comments.splice(commentIndex, 1);

    return deletedComment[0];
  }

}

module.exports = ArcicleService;
