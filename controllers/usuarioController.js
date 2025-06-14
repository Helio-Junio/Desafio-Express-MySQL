const usuarioService = require('../services/usuarioService');

class UsuarioController {
    async criar(req, res) {
        try {
            const { usuario, senha } = req.body;

            // Validações
            if (!usuario || !senha) {
                return res.status(400).json({
                    error: 'Usuário e senha são obrigatórios'
                });
            }

            if (usuario.length < 3 || usuario.length > 255) {
                return res.status(400).json({
                    error: 'Usuário deve ter entre 3 e 255 caracteres'
                });
            }

            if (senha.length < 6) {
                return res.status(400).json({
                    error: 'Senha deve ter pelo menos 6 caracteres'
                });
            }

            const novoUsuario = await usuarioService.criarUsuario(usuario, senha);
            
            console.log(`👤 Usuário criado: ${usuario}`.green);
            
            res.status(201).json(novoUsuario);

        } catch (error) {
            console.error('Erro ao criar usuário:', error.message);
            
            if (error.message === 'Usuário já existe') {
                return res.status(409).json({
                    error: error.message
                });
            }

            res.status(500).json({
                error: 'Erro interno do servidor'
            });
        }
    }

    async listar(req, res) {
        try {
            const usuarios = await usuarioService.listarUsuarios();
            
            console.log(`📋 Listagem de usuários solicitada`.blue);
            
            res.json({
                usuarios: usuarios,
                total: usuarios.length
            });

        } catch (error) {
            console.error('Erro ao listar usuários:', error.message);
            res.status(500).json({
                error: 'Erro interno do servidor'
            });
        }
    }
}

module.exports = new UsuarioController();