const clienteService = require('../services/clienteService');

const getAllClientes = async (req, res) => {
    try {
        const clientes = await clienteService.getAllClientes();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getClienteById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const cliente = await clienteService.getClienteById(id);
        
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCliente = async (req, res) => {
    try {
        const newCliente = await clienteService.createCliente(req.body);
        res.status(201).json(newCliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCliente = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const cliente = await clienteService.getClienteById(id);

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        const updatedCliente = await clienteService.updateCliente(id, req.body);
        res.status(200).json(updatedCliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCliente = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const cliente = await clienteService.getClienteById(id);

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        await clienteService.deleteCliente(id);
        res.status(200).json({ message: 'Cliente removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
};

module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
};