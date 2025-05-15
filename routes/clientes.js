const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { validateCliente } = require('../middlewares/clienteValidator');
const { checkCache } = require('../middlewares/cacheMiddleware');

// Aplicar middleware de cache apenas para rotas GET
router.get('/', checkCache, clienteController.getAllClientes);
router.get('/:id', checkCache, clienteController.getClienteById);

// Rotas que modificam dados (sem cache)
router.post('/', validateCliente, clienteController.createCliente);
router.put('/:id', validateCliente, clienteController.updateCliente);
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;