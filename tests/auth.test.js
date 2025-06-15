const request = require('supertest');
const app = require('../app');

describe('Testes para /auth', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(3001, () => {
      console.log('Servidor rodando na porta 3001');
      done();
    });
  });

  afterAll((done) => {
    server.close(done); // Encerra o servidor após os testes
  });

  it('Deve autenticar um usuário e retornar um token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        usuario: 'usuario1', // Certifique-se de que este usuário existe no banco de dados
        senha: 'senha123' // Certifique-se de que esta senha está correta
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('Deve retornar erro para credenciais inválidas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        usuario: 'usuario_invalido',
        senha: 'senha_invalida'
      });
    expect(res.statusCode).toEqual(401);
  });
});
