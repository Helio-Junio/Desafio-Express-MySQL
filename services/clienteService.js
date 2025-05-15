const db = require('../configs/database');
const { setCache, invalidateClientesCache } = require('../middlewares/cacheMiddleware');
const chalk = require('chalk');

const getAllClientes = async (req) => {
  console.log(chalk.blue('Buscando todos os clientes no banco de dados...'));
  const [clientes] = await db.query('SELECT * FROM clientes');
  
  // Armazenar no cache
  setCache(req, req.originalUrl, clientes);
  
  return clientes;
};

const getClienteById = async (req, id) => {
  console.log(chalk.blue(`Buscando cliente ID ${id} no banco de dados...`));
  const [cliente] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
  
  // Armazenar no cache
  if (cliente.length > 0) {
    setCache(req, req.originalUrl, cliente[0]);
  }
  
  return cliente[0];
};

const createCliente = async (clienteData) => {
  const { nome, sobrenome, email, idade } = clienteData;
  const [result] = await db.query(
    'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
    [nome, sobrenome, email, idade]
  );
  
  // Invalidar cache quando os dados são modificados
  invalidateClientesCache();
  
  return { id: result.insertId, nome, sobrenome, email, idade };
};

const updateCliente = async (id, clienteData) => {
  const { nome, sobrenome, email, idade } = clienteData;
  await db.query(
    'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
    [nome, sobrenome, email, idade, id]
  );
  
  // Invalidar cache quando os dados são modificados
  invalidateClientesCache();
  
  return { id, nome, sobrenome, email, idade };
};

const deleteCliente = async (id) => {
  await db.query('DELETE FROM clientes WHERE id = ?', [id]);
  
  // Invalidar cache quando os dados são modificados
  invalidateClientesCache();
  
  return { id };
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};