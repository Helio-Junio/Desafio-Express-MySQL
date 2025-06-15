const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, clientesController.getAllClientes);
router.post('/', authMiddleware, clientesController.createCliente);
router.put('/:id', authMiddleware, clientesController.updateCliente);
router.delete('/:id', authMiddleware, clientesController.deleteCliente);

module.exports = router;
