const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'admin1234',
  database: 'desafio_backend',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection()
  .then(() => console.log(`Conexão com o banco de dados estabelecida com sucesso.`))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = db;
