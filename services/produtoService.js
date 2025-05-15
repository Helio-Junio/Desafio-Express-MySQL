const db = require('../configs/database');

const getAllProdutos = async () => {
  const [produtos] = await db.query('SELECT * FROM produtos');
  return produtos;
};

const getProdutoById = async (id) => {
  const [produto] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
  return produto[0];
};

const createProduto = async (produtoData) => {
  const { nome, descricao, preco } = produtoData;
  const [result] = await db.query(
    'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)',
    [nome, descricao, preco]
  );
  return { 
    id: result.insertId, 
    nome, 
    descricao, 
    preco,
    data_atualizado: new Date()
  };
};

const updateProduto = async (id, produtoData) => {
  const { nome, descricao, preco } = produtoData;
  await db.query(
    'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
    [nome, descricao, preco, id]
  );
  return { 
    id, 
    nome, 
    descricao, 
    preco,
    data_atualizado: new Date()
  };
};

const deleteProduto = async (id) => {
  await db.query('DELETE FROM produtos WHERE id = ?', [id]);
  return { id };
};

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
};