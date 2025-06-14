const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usuarioService = require('../services/usuarioService');

class AuthController {
    async login(req, res) {
        try {
            const { usuario, senha } = req.body;

            // Validar campos obrigatórios
            if (!usuario || !senha) {
                return res.status(400).json({
                    error: 'Usuário e senha são obrigatórios'
                });
            }

            // Buscar usuário no banco
            const user = await usuarioService.buscarPorUsuario(usuario);
            if (!user) {
                return res.status(401).json({
                    error: 'Credenciais inválidas'
                });
            }

            // Verificar senha
            const senhaValida = await bcrypt.compare(senha, user.senha);
            if (!senhaValida) {
                return res.status(401).json({
                    error: 'Credenciais inválidas'
                });
            }

            // Gerar token JWT
            const token = jwt.sign(
                { 
                    id: user.id, 
                    usuario: user.usuario 
                },
                process.env.JWT_SECRET,
                { 
                    expiresIn: process.env.JWT_EXPIRES_IN || '24h' 
                }
            );

            // Salvar token no banco
            await usuarioService.atualizarToken(user.id, token);

            console.log(`🔐 Login realizado: ${user.usuario}`.green);

            res.json({
                message: 'Login realizado com sucesso',
                token: token,
                usuario: user.usuario
            });

        } catch (error) {
            console.error('Erro no login:', error.message);
            res.status(500).json({
                error: 'Erro interno do servidor'
            });
        }
    }

    async logout(req, res) {
        try {
            const userId = req.user.id;

            // Remover token do banco
            await usuarioService.removerToken(userId);

            console.log(`🚪 Logout realizado: ${req.user.usuario}`.yellow);

            res.json({
                message: 'Logout realizado com sucesso'
            });

        } catch (error) {
            console.error('Erro no logout:', error.message);
            res.status(500).json({
                error: 'Erro interno do servidor'
            });
        }
    }
}

module.exports = new AuthController();