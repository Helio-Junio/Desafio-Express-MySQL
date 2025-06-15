const usuariosService = require('../services/usuariosService');

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuariosService.getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    console.log('Iniciando a criação do usuário...');
    const usuario = req.body;
    const newUser = await usuariosService.createUsuario(usuario);
    console.log('Usuário criado com sucesso:', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: error.message });
  }
};
