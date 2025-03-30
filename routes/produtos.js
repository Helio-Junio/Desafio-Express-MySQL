const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const {validateProduto} = require('../middlewares/produtoValidator');

// Listar todos os produtos
router.get('/', produtoController.getAllProdutos);

//Buscar produto por ID
router.get('/:id', produtoController.getProdutoById);

//Criar um novo produto
router.post('/', validateProduto, produtoController.createProduto);

//Atualizar um produto 
router.put('/:id', validateProduto, produtoController.updateProduto);

//Remover um produto
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;