const { validationResult } = require("express-validator");
const Article = require("../models/articleModel");
const path = require("path");
const fs = require("fs");

exports.createArticle = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Validation failed, entered data is incorrect.");
    err.statusCode = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("No image provided.");
    err.statusCode = 400;
    throw err;
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;

  const Posting = new Article({
    title: title,
    body: body,
    image: image,
    author: {
      uid: 1,
      name: "John Doe",
    },
  });

  Posting.save()
    .then((result) => {
      res.status(201).json({
        message: "Create blog post Successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

exports.getAllArticles = (req, res, next) => {
  Article.find()
    .then((result) => {
      res.status(200).json({
        message: "Get all articles successfully",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleById = (req, res, next) => {
  const id = req.params.id;
  Article.findById(id)
    .then((result) => {
      if (!result) {
        const err = new Error("Article not found.");
        err.statusCode = 404;
        throw err;
      }
      res.status(200).json({
        message: "Get article by id successfully",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateArticle = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Validation failed, entered data is incorrect.");
    err.statusCode = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("No image provided.");
    err.statusCode = 400;
    throw err;
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;
  const id = req.params.id;

  Article.findById(id)
    .then((post) => {
      if (!post) {
        const err = new Error("Article not found.");
        err.statusCode = 404;
        throw err;
      }

      post.title = title;
      post.body = body;
      post.image = image;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update article successfully",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });

  const Posting = new Article({
    title: title,
    body: body,
    image: image,
    author: { uid: 1, name: "John Doe" },
  });
};

exports.deleteArticle = (req, res, next) => {
  const id = req.params.id;

  Article.findById(id)
    .then((post) => {
      if (!post) {
        const err = new Error("Article not found.");
        err.statusCode = 404;
        throw err;
      }

      removeImage(post.image);
      return Article.findByIdAndRemove(id);
    })
    .then((result) => {
      res.status(200).json({
        message: "Delete article successfully",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const removeImage = (filePath) => {
  filePath = path.join(__dirname, "../..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
