const express = require('express');
const cors = require('cors');
const colors = require('colors');
require('dotenv').config();

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ==========================================
// IMPORTAR TODAS AS ROTAS
// ==========================================
const indexRouter = require('./routes/index');
const clientesRouter = require('./routes/clientes');
const produtosRouter = require('./routes/produtos');
const usuarioRoutes = require('./routes/usuarios');

// Importar controllers de autenticação (sem rota separada)
const authController = require('./controllers/authController');

// Importar middleware de autenticação
const authMiddleware = require('./middlewares/auth');

// ==========================================
// CONFIGURAR ROTAS PÚBLICAS
// ==========================================

// Rota principal (pública)
app.use('/', indexRouter);

// Rotas de autenticação (públicas)
app.post('/login', authController.login);
app.post('/logout', authMiddleware, authController.logout);

// Rota de usuários (pública para criar, mas pode proteger o GET se quiser)
app.use('/usuarios', usuarioRoutes);

// Rota de produtos (pública conforme requisito)
app.use('/produtos', produtosRouter);

// ==========================================
// CONFIGURAR ROTAS PROTEGIDAS
// ==========================================

// Rota de clientes (PROTEGIDA - requer autenticação)
app.use('/clientes', authMiddleware, clientesRouter);

// ==========================================
// ENDPOINT PADRÃO PARA VERIFICAR SERVIDOR
// ==========================================
app.get('/', (req, res) => {
    res.json({
        message: 'Servidor funcionando! 🚀',
        status: 'online',
        timestamp: new Date().toISOString()
    });
});

// ==========================================
// MIDDLEWARE DE ERRO 404
// ==========================================
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Rota não encontrada',
        path: req.path,
        method: req.method
    });
});

// ==========================================
// MIDDLEWARE DE TRATAMENTO DE ERROS
// ==========================================
app.use((err, req, res, next) => {
    console.error('Erro interno:'.red, err.message);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
    });
});

// ==========================================
// INICIALIZAR SERVIDOR
// ==========================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`.green);
    console.log(`📍 URL: http://localhost:${PORT}`.cyan);
    console.log('');
    console.log('📋 ROTAS DISPONÍVEIS:'.yellow);
    console.log('├── GET    /                 (público)'.white);
    console.log('├── POST   /login            (público)'.white);
    console.log('├── POST   /logout           (protegido)'.white);
    console.log('├── GET    /produtos         (público)'.white);
    console.log('├── POST   /produtos         (público)'.white);
    console.log('├── GET    /usuarios         (público)'.white);
    console.log('├── POST   /usuarios         (público)'.white);
    console.log('├── GET    /clientes         (🔒 PROTEGIDO)'.red);
    console.log('├── POST   /clientes         (🔒 PROTEGIDO)'.red);
    console.log('├── PUT    /clientes/:id     (🔒 PROTEGIDO)'.red);
    console.log('└── DELETE /clientes/:id     (🔒 PROTEGIDO)'.red);
    console.log('');
    console.log('🔑 Para acessar rotas protegidas, use:'.yellow);
    console.log('   Authorization: Bearer <seu_token>'.gray);
});

module.exports = app;