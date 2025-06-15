require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Importar rotas
const clientesRoutes = require('./routes/clientes');
const produtosRoutes = require('./routes/produtos');
const usuariosRoutes = require('./routes/usuarios');
const authRoutes = require('./routes/auth');

app.use('/clientes', clientesRoutes);
app.use('/produtos', produtosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Bem-vindo à API do Desafio Final!');
});

module.exports = app;