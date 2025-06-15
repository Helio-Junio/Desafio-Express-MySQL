const produtosService = require('../services/produtosService');

exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await produtosService.getAllProdutos();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduto = async (req, res) => {
  try {
    const produto = await produtosService.createProduto(req.body);
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduto = async (req, res) => {
  try {
    const produto = await produtosService.updateProduto(req.params.id, req.body);
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduto = async (req, res) => {
  try {
    await produtosService.deleteProduto(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
