const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const {validateCliente} = require('../middlewares/clienteValidator');

// Listar todos os clientes
router.get('/', clienteController.getAllClientes);

//Buscar cliente por ID
router.get('/:id', clienteController.getClienteById);

//Criar um novo cliente
router.post('/', validateCliente, clienteController.createCliente);

//Atualizar um cliente existente
router.put('/:id', validateCliente, clienteController.updateCliente);

//Remover um cliente
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;