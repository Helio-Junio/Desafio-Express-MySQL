const clienteService = require('../services/clienteService');
const chalk = require('chalk');

const getAllClientes = async (req, res) => {
  try {
    console.log(chalk.cyan('Requisição GET para /clientes'));
    const clientes = await clienteService.getAllClientes(req);
    res.status(200).json(clientes);
  } catch (error) {
    console.error(chalk.red('Erro ao buscar clientes:'), error);
    res.status(500).json({ error: error.message });
  }
};

const getClienteById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(chalk.cyan(`Requisição GET para /clientes/${id}`));
    
    const cliente = await clienteService.getClienteById(req, id);
    
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    
    res.status(200).json(cliente);
  } catch (error) {
    console.error(chalk.red(`Erro ao buscar cliente ID ${req.params.id}:`), error);
    res.status(500).json({ error: error.message });
  }
};

const createCliente = async (req, res) => {
  try {
    console.log(chalk.cyan('Requisição POST para /clientes'));
    const newCliente = await clienteService.createCliente(req.body);
    res.status(201).json(newCliente);
  } catch (error) {
    console.error(chalk.red('Erro ao criar cliente:'), error);
    res.status(500).json({ error: error.message });
  }
};

const updateCliente = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(chalk.cyan(`Requisição PUT para /clientes/${id}`));
    
    // Verificar se o cliente existe
    const clienteExists = await clienteService.getClienteById(req, id);
    if (!clienteExists) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    
    const updatedCliente = await clienteService.updateCliente(id, req.body);
    res.status(200).json(updatedCliente);
  } catch (error) {
    console.error(chalk.red(`Erro ao atualizar cliente ID ${req.params.id}:`), error);
    res.status(500).json({ error: error.message });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(chalk.cyan(`Requisição DELETE para /clientes/${id}`));
    
    // Verificar se o cliente existe
    const clienteExists = await clienteService.getClienteById(req, id);
    if (!clienteExists) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    
    await clienteService.deleteCliente(id);
    res.status(200).json({ message: 'Cliente removido com sucesso' });
  } catch (error) {
    console.error(chalk.red(`Erro ao remover cliente ID ${req.params.id}:`), error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};