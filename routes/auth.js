const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

// POST /login - Fazer login
router.post('/login', authController.login);

// POST /logout - Fazer logout (protegido)
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;