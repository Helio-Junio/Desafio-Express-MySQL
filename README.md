
# Desafio Back-End - Express + DB + Caching 🔙🔚

Este projeto é uma API RESTful construída com Node.js, Express e MySQL, com implementação de sistema de cache para otimizar o desempenho.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript server-side
- **Express**: Framework web para Node.js
- **MySQL**: Banco de dados relacional
- **Node-Cache**: Sistema de cache em memória
- **Dotenv**: Gerenciamento de variáveis de ambiente
- **Chalk**: Estilização de logs no console
- **JWT (JSON Web Tokens)**
- **bcrypt**
- **Jest + Supertest**

## Funcionalidades

- CRUD completo para clientes e produtos
- Sistema de cache para otimizar consultas ao endpoint `/clientes`
- Logs detalhados indicando se os dados foram recuperados do cache ou do banco
- Invalidação automática do cache após 30 segundos
- Invalidação do cache quando há modificações nos dados

### ROTAS PÚBLICAS (sem autenticação):
- GET /                    → Verificar se servidor está online
- POST /login             → Fazer login e receber token
- GET /produtos           → Listar produtos
- POST /produtos          → Criar produto
- PUT /produtos/:id       → Atualizar produto
- DELETE /produtos/:id    → Deletar produto
- GET /usuarios           → Listar usuários
- POST /usuarios          → Criar usuário

### ROTAS PROTEGIDAS (requer token JWT):
- POST /logout            → Fazer logout
- GET /clientes           → Listar clientes (COM CACHE)
- POST /clientes          → Criar cliente
- PUT /clientes/:id       → Atualizar cliente
- DELETE /clientes/:id    → Deletar cliente

### FLUXO DE AUTENTICAÇÃO:
1. POST /usuarios         → Criar um usuário
2. POST /login           → Fazer login (recebe token)
3. GET /clientes         → Usar token no header
4. POST /logout          → Invalidar token



## Imagens 📸
<div align="center">
<h3>Clientes</h3>
<img src="https://github.com/user-attachments/assets/62af3c72-6900-416e-86d5-4de1cb417369" width=300px />
<img src="https://github.com/user-attachments/assets/7c6d1337-6a97-4f99-a401-c95e7a9c7ae0" width=300px /><br>
<img src="https://github.com/user-attachments/assets/d55ce07e-d387-4910-93fe-48d25486b065" width=300px />
<img src="https://github.com/user-attachments/assets/57fead00-001d-42ce-892c-56540032bcdd" width=300px />
</div>
<div align="center">
  <h3>Produtos</h3>
  <img src="https://github.com/user-attachments/assets/3e6edff4-9ca1-4f5a-8d56-e3748356b86f" width=300px />
  <img src="https://github.com/user-attachments/assets/99be301c-a929-4f39-9808-def409a8b33d" width=300px /><br>
  <img src="https://github.com/user-attachments/assets/9336ba29-dd36-474f-b4a0-85c6929f6b97" width=300px />
  <img src="https://github.com/user-attachments/assets/19fc3715-4a4c-4171-9e8f-c2b034ca217b" width=300px />
</div>

## Autores 🧑‍🚀
 - **Hélio Ferreira**
 - **Guilherme Salatiel**
 - **Oscar Lara**
