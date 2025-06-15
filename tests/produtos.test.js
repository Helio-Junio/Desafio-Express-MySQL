const request = require('supertest');
const app = require('../app');

describe('Testes para /produtos', () => {
  it('Deve retornar todos os produtos', async () => {
    const res = await request(app).get('/produtos');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('Deve criar um novo produto', async () => {
    const res = await request(app)
      .post('/produtos')
      .send({
        nome: 'Novo Produto',
        descricao: 'Descrição do Novo Produto',
        preco: 15.99,
        data_atualizado: '2023-01-01 00:00:00'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});
