const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// POST /usuarios - Criar usuário
router.post('/', usuarioController.criar);

// GET /usuarios - Listar usuários
router.get('/', usuarioController.listar);

module.exports = router;
