const validateProduto = (req, res, next) => {
  const { nome, descricao, preco } = req.body;
  
  if (!nome || !preco) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  }
  
  if (typeof nome !== 'string') {
    return res.status(400).json({ error: 'Nome deve ser uma string' });
  }
  
  if (descricao && typeof descricao !== 'string') {
    return res.status(400).json({ error: 'Descrição deve ser uma string' });
  }
  
  if (typeof preco !== 'number' || preco <= 0) {
    return res.status(400).json({ error: 'Preço deve ser um número positivo' });
  }
  
  next();
};

module.exports = {
  validateProduto,
};