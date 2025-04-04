const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'API Desafio Backend - Express + MySQL' });
});

module.exports = router;