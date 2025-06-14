const db = require('../configs/database');
const bcrypt = require('bcryptjs');

class UsuarioService {
    async criarUsuario(usuario, senha) {
        try {
            // Verificar se usuário já existe
            const [existing] = await db.execute(
                'SELECT id FROM usuarios WHERE usuario = ?',
                [usuario]
            );
            
            if (existing.length > 0) {
                throw new Error('Usuário já existe');
            }

            // Criptografar senha
            const saltRounds = 10;
            const senhaHash = await bcrypt.hash(senha, saltRounds);

            // Inserir usuário
            const [result] = await db.execute(
                'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)',
                [usuario, senhaHash]
            );

            return {
                id: result.insertId,
                usuario: usuario,
                message: 'Usuário criado com sucesso'
            };
        } catch (error) {
            throw error;
        }
    }

    async buscarPorUsuario(usuario) {
        try {
            const [rows] = await db.execute(
                'SELECT id, usuario, senha, token FROM usuarios WHERE usuario = ?',
                [usuario]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async atualizarToken(id, token) {
        try {
            await db.execute(
                'UPDATE usuarios SET token = ? WHERE id = ?',
                [token, id]
            );
        } catch (error) {
            throw error;
        }
    }

    async removerToken(id) {
        try {
            await db.execute(
                'UPDATE usuarios SET token = NULL WHERE id = ?',
                [id]
            );
        } catch (error) {
            throw error;
        }
    }

    async listarUsuarios() {
        try {
            const [rows] = await db.execute(
                'SELECT id, usuario, created_at FROM usuarios'
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async verificarToken(token) {
        try {
            const [rows] = await db.execute(
                'SELECT id, usuario FROM usuarios WHERE token = ?',
                [token]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UsuarioService();