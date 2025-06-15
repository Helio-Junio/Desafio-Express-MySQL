const db = require('../configs/db');

exports.getAllProdutos = async () => {
  const [rows] = await db.query('SELECT * FROM produtos');
  return rows;
};

exports.createProduto = async (produto) => {
  const { nome, descricao, preco, data_atualizado } = produto;
  const [result] = await db.query(
    'INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)',
    [nome, descricao, preco, data_atualizado]
  );
  return { id: result.insertId, nome, descricao, preco, data_atualizado };
};

exports.updateProduto = async (id, produto) => {
  const { nome, descricao, preco, data_atualizado } = produto;
  await db.query(
    'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?',
    [nome, descricao, preco, data_atualizado, id]
  );
  return { id, nome, descricao, preco, data_atualizado };
};

exports.deleteProduto = async (id) => {
  await db.query('DELETE FROM produtos WHERE id = ?', [id]);
};
