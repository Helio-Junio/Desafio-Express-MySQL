const produtoService = require('../services/produtoService');
const colors = require('colors');

const getAllProdutos = async (req, res) => {
  try {
    const produtos = await produtoService.getAllProdutos();
    console.log(colors.cyan('Requisição GET para /produtos'));
    res.status(200).json(produtos);
  } catch (error) {
    console.error(colors.red('Erro ao buscar produtos:', error));
    res.status(500).json({ error: error.message });
  }
};

const getProdutoById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(colors.cyan(`Requisição GET para /produtos/${id}`));
    const produto = await produtoService.getProdutoById(id);
    
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    
    res.status(200).json(produto);
  } catch (error) {
    console.error(colors.red(`Erro ao buscar produto ID ${req.params.id}:`, error));
    res.status(500).json({ error: error.message });
  }
};

const createProduto = async (req, res) => {
  try {
    console.log(colors.cyan('Requisição POST para /produtos'));
    const newProduto = await produtoService.createProduto(req.body);
    res.status(201).json(newProduto);
  } catch (error) {
    console.error(colors.red('Erro ao criar produto:', error));
    res.status(500).json({ error: error.message });
  }
};

const updateProduto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(colors.cyan(`Requisição PUT para /produtos/${id}`));
    const produto = await produtoService.getProdutoById(id);
    
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    
    const updatedProduto = await produtoService.updateProduto(id, req.body);
    res.status(200).json(updatedProduto);
  } catch (error) {
    console.error(colors.red(`Erro ao atualizar produto ID ${req.params.id}:`, error));
    res.status(500).json({ error: error.message });
  }
};

const deleteProduto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(colors.cyan(`Requisição DELETE para /produtos/${id}`));
    const produto = await produtoService.getProdutoById(id);
    
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    
    await produtoService.deleteProduto(id);
    res.status(200).json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    console.error(colors.red(`Erro ao remover produto ID ${req.params.id}:`, error));
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
};