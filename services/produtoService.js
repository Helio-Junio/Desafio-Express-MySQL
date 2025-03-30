const db =require('../configs/database');

const getAllProdutos = async () => {
    const [produtos] = await db.query('SELECT * FROM produtos;');
    return produtos;
};

const getProdutoById = async (id) => {
    const [produto] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return produto[0];
};

const createProduto = async (produtoData) => {
    const {nome, preco, descricao} = produtoData;
    const [result] = await db.query(
        'INSERT INTO produtos (nome, preco, descricao) VALUES (?, ?, ?)',
        [nome, preco, descricao]
    );
    return {id: result.insertId, nome, preco, descricao, data_atualizado: new Date()};
};

const updateProduto = async (id, produtoData) => {
    const {nome, preco, descricao} = produtoData;
    await db.query(
        'UPDATE produtos SET nome = ?, preco = ?, descricao = ? WHERE id = ?',
        [nome, preco, descricao, id]
    );
    return {id, nome, preco, descricao, data_atualizado: new Date()};
};

const deleteProduto = async (id) => {
    await db.query('DELETE FROM produtos WHERE id = ?', [id]);
    return {id};
};

module.exports = {
    getAllProdutos,
    getProdutoById,
    createProduto,
    updateProduto,
    deleteProduto,
};