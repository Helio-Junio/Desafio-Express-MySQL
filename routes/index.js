const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Desafio Back-End - Express + DB + Cache' });
});

module.exports = router;