const clientesService = require('../services/clientesService');
const cache = require('../configs/cache');

exports.getAllClientes = async (req, res) => {
  try {
    const cacheKey = 'clientes';
    let clientes = cache.get(cacheKey);

    if (clientes) {
      console.log('Dados servidos do cache');
      return res.status(200).json(clientes);
    }

    clientes = await clientesService.getAllClientes();
    cache.set(cacheKey, clientes, 30);
    console.log('Dados servidos do banco de dados');
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createCliente = async (req, res) => {
  try {
    const cliente = req.body;
    const newCliente = await clientesService.createCliente(cliente);
    res.status(201).json(newCliente);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ error: error.message });
  }
};


exports.updateCliente = async (req, res) => {
  try {
    const cliente = await clientesService.updateCliente(req.params.id, req.body);
    cache.del('clientes');
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    await clientesService.deleteCliente(req.params.id);
    cache.del('clientes');
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
