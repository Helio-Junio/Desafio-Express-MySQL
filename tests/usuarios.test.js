const request = require('supertest');
const app = require('../app');
const db = require('../configs/db');

jest.setTimeout(30000); // 30 segundos para garantir margem

beforeAll(async () => {
  console.log('Esperando conexão com o banco...');
  // Se precisar, aguarde o pool conectar manualmente
  await db.connect?.(); // Se sua conexão não for automática
  console.log('Banco conectado');
});

afterAll(async () => {
  await db.end();
});

describe('Usuários', () => {
  it('Deve criar um novo usuário', async () => {
    console.log('Iniciando requisição de criação...');
    const res = await request(app)
      .post('/usuarios')
      .send({
        usuario: 'novo_usuario_' + Date.now(), // evitar duplicata
        senha: 'senha123'
      });

    console.log('Resposta recebida:', res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});
