const db = require('../configs/db');

exports.getAllClientes = async () => {
  const [rows] = await db.query('SELECT * FROM clientes');
  return rows;
};

exports.createCliente = async (cliente) => {
  const { nome, sobrenome, email, idade } = cliente;

  // Verifica se o cliente já existe
  const [existingCliente] = await db.query('SELECT * FROM clientes WHERE email = ?', [email]);
  if (existingCliente.length > 0) {
    throw new Error('Cliente com este e-mail já existe.');
  }
  // Insere o novo cliente
  const [result] = await db.query(
    'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
    [nome, sobrenome, email, idade]
  );
  return { id: result.insertId, nome, sobrenome, email, idade };
};

exports.updateCliente = async (id, cliente) => {
  const { nome, sobrenome, email, idade } = cliente;
  await db.query(
    'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
    [nome, sobrenome, email, idade, id]
  );
  return { id, nome, sobrenome, email, idade };
};

exports.deleteCliente = async (id) => {
  await db.query('DELETE FROM clientes WHERE id = ?', [id]);
};
