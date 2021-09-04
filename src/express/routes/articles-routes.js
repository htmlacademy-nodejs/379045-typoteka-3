'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();
const api = require(`../api`).getAPI();
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const UPLOAD_DIR = `../upload/img/`;

const MimeTypeExtension = {
  'image/png': `png`,
  'image/jpeg': `jpg`,
  'image/jpg': `jpg`,
};

const fileFilter = (req, file, cb) => {
  const allowTypes = Object.keys(MimeTypeExtension);
  const isValid = allowTypes.includes(file.mimetype);
  cb(null, isValid);
};

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = MimeTypeExtension[file.mimetype];
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({
  storage, fileFilter, limits: {
    fileSize: 5 * 1024 * 1024
  }
});

articlesRouter.get(`/add`, async (req, res) => {
  const {error} = req.query;
  const categories = await api.getCategories();
  res.render(`new-post`, {categories, error});
});

articlesRouter.post(`/add`, upload.single(`upload`), async (req, res) => {
  const {body, file} = req;

  const data = {
    picture: file ? file.filename : ``,
    title: body.title,
    createdDate: body.date,
    announce: body.announcement,
    fullText: body[`full-text`],
    categories: [...body.category] || []
  };

  try {
    await api.createArticle(data);
    res.redirect(`/my`);
  } catch (err) {
    res.redirect(`/articles/add?error=${encodeURIComponent(err.response.data)}`);
  }

});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const {error} = req.query;
  const action = `/articles/edit/${id}`;
  const [article, categories] = await Promise.all([api.getArticle(id), api.getCategories()]);

  res.render(`new-post`, {article, categories, id, error, action});
});

articlesRouter.post(`/edit/:id`, upload.single(`upload`), async (req, res) => {
  const {body, file} = req;
  const {id} = req.params;

  const data = {
    picture: file ? file.filename : body[`old-image`],
    title: body.title,
    createdDate: body.date,
    announce: body.announcement,
    fullText: body[`full-text`],
    categories: [...body.category] || []
  };

  try {
    await api.editArticle(id, data);
    res.redirect(`/my`);
  } catch (err) {
    res.redirect(`/articles/edit/${id}?error=${encodeURIComponent(err.response.data)}`);
  }

});

articlesRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const {error} = req.query;
  const [article, comments] = await Promise.all([api.getArticle(id, true), api.getComments(id)]);

  res.render(`post`, {article, comments, error, id});
});

articlesRouter.post(`/:id/comments`, async (req, res) => {
  const {id} = req.params;
  const {comment} = req.body;

  try {
    await api.createComment(id, {text: comment});
    res.redirect(`/articles/${id}`);
  } catch (error) {
    res.redirect(`/articles/${id}?error=${encodeURIComponent(error.response.data)}`);
  }
});

module.exports = articlesRouter;
