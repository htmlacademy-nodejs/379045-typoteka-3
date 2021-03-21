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

articlesRouter.post(`/add`, upload.single(`upload`), async (req, res) => {
  const {body, file} = req;

  if (!file) {
    res.redirect(`back`);
  }

  const data = {
    id: nanoid(),
    img: file.filename,
    title: body.title,
    createdDate: body.date,
    announce: body.announcement,
    fullText: body[`full-text`],
    categories: body.category || [],
    comments: [],
  };

  try {
    await api.createArticle(data);
    res.redirect(`/my`);
  } catch (err) {
    res.redirect(`back`);
  }

});

articlesRouter.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  res.render(`new-post`, {categories});
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const [article, categories] = await Promise.all([api.getArticle(req.params.id), api.getCategories()]);
  res.render(`new-post`, {article, categories});
});

articlesRouter.get(`/:id`, async (req, res) => {
  const [article, categories] = await Promise.all([api.getArticle(req.params.id), api.getCategories()]);
  res.render(`post`, {article, categories});
});

module.exports = articlesRouter;
