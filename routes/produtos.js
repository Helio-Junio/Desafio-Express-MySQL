const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const { validateProduto } = require('../middlewares/produtoValidator');

// Produtos não usam cache conforme o desafio
router.get('/', produtoController.getAllProdutos);
router.get('/:id', produtoController.getProdutoById);
router.post('/', validateProduto, produtoController.createProduto);
router.put('/:id', validateProduto, produtoController.updateProduto);
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;