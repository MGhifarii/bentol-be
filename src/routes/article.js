const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const articleController = require('../controllers/article');

// [POST] /api/article/post
router.post('/post', [
  body('title').isLength({ min: 5 }).withMessage('Title must be at least 5 chars long'),
  body('body').isLength({ min: 5 }).withMessage('Body must be at least 5 chars long')],
  articleController.createArticle);

router.get('/posts', articleController.getAllArticles);
router.get('/post/:id', articleController.getArticleById);
router.put('/post/:id', [
  body('title').isLength({ min: 5 }).withMessage('Title must be at least 5 chars long'),
  body('body').isLength({ min: 5 }).withMessage('Body must be at least 5 chars long')],
  articleController.updateArticle);

router.delete('/post/:id', articleController.deleteArticle);

module.exports = router;