USE desafio_backend;

-- Dados de exemplo para clientes
INSERT INTO clientes (nome, sobrenome, email, idade) VALUES
('João', 'Silva', 'joao.silva@email.com', 30),
('Maria', 'Santos', 'maria.santos@email.com', 25),
('Pedro', 'Oliveira', 'pedro.oliveira@email.com', 35),
('Ana', 'Costa', 'ana.costa@email.com', 28),
('Carlos', 'Pereira', 'carlos.pereira@email.com', 42);

-- Dados de exemplo para produtos
INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES
('Notebook Dell', 'Notebook Dell Inspiron 15 3000', 2500.99, '2024-01-15 10:30:00'),
('Mouse Logitech', 'Mouse óptico sem fio', 89.90, '2024-02-20 14:15:00'),
('Teclado Mecânico', 'Teclado mecânico RGB', 299.99, '2024-03-10 09:45:00'),
('Monitor Samsung', 'Monitor LED 24 polegadas', 899.00, '2024-04-05 16:20:00'),
('Webcam HD', 'Webcam Full HD 1080p', 199.90, '2024-05-12 11:00:00');


-- Dados de exemplo para usuarios
INSERT INTO usuarios (usuario, senha) VALUES
('usuario1', '$2b$10$someHashedPassword1'),
('usuario2', '$2b$10$someHashedPassword2');