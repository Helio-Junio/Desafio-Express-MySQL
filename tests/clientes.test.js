const request = require('supertest');
const app = require('../app');
const db = require('../configs/db');

describe('Testes para /clientes', () => {
  let server;
  let token;

  beforeAll((done) => {
    server = app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
      done();
    });
  });

  beforeEach(async () => {
    // Simule um login para obter um token válido
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        usuario: 'usuario1', // Certifique-se de que este usuário existe no banco de dados
        senha: 'senha123' // Certifique-se de que esta senha está correta
      });

    // Verifique se o login foi bem-sucedido e obtenha o token
    if (loginResponse.statusCode !== 200) {
      console.error('Erro ao fazer login:', loginResponse.body);
      throw new Error('Falha ao obter token de autenticação');
    }

    token = loginResponse.body.token;
  });

  afterAll((done) => {
    server.close(done); // Encerra o servidor após os testes
  });

  it('Deve retornar todos os clientes', async () => {
    const res = await request(app)
      .get('/clientes')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('Deve criar um novo cliente', async () => {
    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Teste',
        sobrenome: 'Testando',
        email: 'testando@exemplo.com',
        idade: 30
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  // Fecha a conexão com o banco de dados após todos os testes
  afterAll(async () => {
    await db.end(); // Fecha a conexão com o banco de dados
  });
});
