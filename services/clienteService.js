const db = require('../configs/database');

const getAllClientes = async () => {
    const [clientes] = await db.query('SELECT * FROM clientes;');
    return clientes;
};

const getClienteById = async (id) => {
    const [cliente] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
    return cliente[0];
};

const createCliente = async (clienteData) => {
    const {nome, sobrenome, email, idade} = clienteData;
    const [result] = await db.query(
        'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
        [nome, sobrenome, email, idade]
    );
    return {id: result.insertId, nome, sobrenome, email, idade};
};

const updateCliente = async (id, clienteData) => {
    const {nome, sobrenome, email, idade} = clienteData;
    await db.query(
        'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
        [nome, sobrenome, email, idade, id]
    );
    return {id, nome, sobrenome, email, idade};
};

const deleteCliente = async (id) => {
    await db.query('DELETE FROM clientes WHERE id = ?', [id]);
    return {id};
};

module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
};