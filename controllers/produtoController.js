const produtoService = require('../services/produtoService');

const getAllProdutos = async (req, res) => {
    try {
        const produtos = await produtoService.getAllProdutos();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProdutoById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const produto = await produtoService.getProdutoById(id);
        
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduto = async (req, res) => {
    try {
        const newProduto = await produtoService.createProduto(req.body);
        res.status(201).json(newProduto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduto = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const produto = await produtoService.getProdutoById(id);

        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const updatedProduto = await produtoService.updateProduto(id, req.body);
        res.status(200).json(updatedProduto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduto = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const produto = await produtoService.getProdutoById(id);

        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        await produtoService.deleteProduto(id);
        res.status(200).json({ message: 'Produto removido com sucesso' });
    } catch (error) {
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