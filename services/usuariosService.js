const db = require('../configs/db');
const bcrypt = require('bcrypt');

exports.createUsuario = async (usuario) => {
  const { usuario: username, senha } = usuario;
  console.log('Recebido no service:', usuario);

  const hashedPassword = await bcrypt.hash(senha, 10);
  console.log('Senha criptografada.');

  console.log('Antes do INSERT');
  const [result] = await db.query(
    'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)',
    [username, hashedPassword]
  );
  console.log('Depois do INSERT');

  return { id: result.insertId, usuario: username };
};


// Adicione a função getUsuarioByUsername
exports.getUsuarioByUsername = async (username) => {
  const [rows] = await db.query(
    'SELECT * FROM usuarios WHERE usuario = ?',
    [username]
  );
  return rows[0]; // Retorna o primeiro usuário encontrado ou undefined se não houver
};
