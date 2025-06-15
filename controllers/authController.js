const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usuariosService = require('../services/usuariosService');

exports.login = async (req, res) => {
  try {
    const { usuario, senha } = req.body;
    const user = await usuariosService.getUsuarioByUsername(usuario);

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token'); // Se usar o cookies
  res.status(200).json({ 
    message: 'Logout realizado com sucesso', // Mensagem para informar ao cliente
    clearToken: true
  });
};
