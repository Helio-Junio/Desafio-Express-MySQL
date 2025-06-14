const jwt = require('jsonwebtoken');
const usuarioService = require('../services/usuarioService');

const authMiddleware = async (req, res, next) => {
    try {
        // Verificar se o header Authorization existe
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                error: 'Token de acesso não fornecido'
            });
        }

        // Verificar formato do token (Bearer token)
        const parts = authHeader.split(' ');
        
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({
                error: 'Formato de token inválido'
            });
        }

        const token = parts[1];

        // Verificar se o token é válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verificar se o token ainda existe no banco (não foi invalidado)
        const userWithToken = await usuarioService.verificarToken(token);
        
        if (!userWithToken) {
            return res.status(401).json({
                error: 'Token inválido ou expirado'
            });
        }

        // Adicionar informações do usuário na requisição
        req.user = {
            id: decoded.id,
            usuario: decoded.usuario
        };

        console.log(`🔑 Acesso autenticado: ${decoded.usuario}`.cyan);

        next();

    } catch (error) {
        console.error('Erro na autenticação:', error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                error: 'Token inválido'
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expirado'
            });
        }

        return res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
};

module.exports = authMiddleware;