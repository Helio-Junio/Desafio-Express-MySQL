const validateCliente = (req, res, next) => {
    const {nome, sobrenome, email, idade} = req.body;

    if(!nome || !sobrenome || !email || !idade) {
        return res.status(400).json({error: 'Todos os campos são obrigatórios'});
    }

    if(typeof nome !== 'string' || typeof sobrenome !== 'string' || typeof email !== 'string') {
        return res.status(400).json({error: 'Nome, sobrenome e email devem ser strings'});
    }

    if(typeof idade !== 'number' || idade <= 0) {
        return res.status(400).json({error: 'Idade deve ser um número positivo'});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        return res.status(400).json({error: 'Email inválido'});
    }

    next();
    };

    module.exports = {
        validateCliente,
    };