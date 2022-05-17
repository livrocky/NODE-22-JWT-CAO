const express = require('express');
const { validateToken } = require('../middleware');
const { getAllArticlesDb } = require('../model/articleModel');

const articleRoute = express.Router();

articleRoute.get('/article', validateToken, async (req, res) => {
  if (req.userId) {
    // atsisiusti tik to vartotojo article
    console.log('gauti tik sio vartotojo article', req.userId);
  }
  try {
    const allArticleArr = await getAllArticlesDb();
    res.json(allArticleArr);
  } catch (error) {
    res.sendStatus(500);
  }
});

articleRoute.get('/allArticle', validateToken, async (req, res) => {
  try {
    const allArticleArr = await getAllArticlesDb();
    res.json(allArticleArr);
  } catch (error) {
    // console.log('stack=== ', error.stack);
    res.sendStatus(500);
  }
});

module.exports = articleRoute;
