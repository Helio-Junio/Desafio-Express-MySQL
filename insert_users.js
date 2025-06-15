const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

// Configuração do banco de dados
const dbConfig = {
  host: 'localhost',
  user: 'admin',
  password: 'admin1234',
  database: 'desafio_backend'
};

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function deleteExistingUsers(connection) {
  await connection.execute('DELETE FROM usuarios WHERE usuario IN (?, ?)', ['usuario1', 'usuario2']);
}

async function insertUser(connection, usuario, senha) {
  const hashedPassword = await hashPassword(senha);
  await connection.execute(
    'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)',
    [usuario, hashedPassword]
  );
}

// Inserir usuários com senhas criptografadas
(async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    await deleteExistingUsers(connection); // Excluir usuários existentes
    await insertUser(connection, 'usuario1', 'senha123');
    await insertUser(connection, 'usuario2', 'senha123');
    await connection.end();
    console.log('Usuários inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir usuários:', error);
  }
})();