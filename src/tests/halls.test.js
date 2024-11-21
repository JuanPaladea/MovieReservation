const supertest = require('supertest');
const {faker} = require('@faker-js/faker');

const app = "http://localhost:4000";
const request = supertest(app);

let token
let hallId

beforeAll(async () => {
  const response = await request
    .post('/api/session/login')
    .send({
      email: "test@email.com",
      password: "Test1234"})

  token = response.body.data.token
});

describe('Halls', () => {
  it('should return a list of halls', async () => {
    const response = await request
      .get('/api/halls')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it('should return a hall by id', async () => {
    const response = await request
      .get('/api/halls/1')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it('should add a hall', async () => {
    const response = await request
      .post('/api/halls')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: faker.lorem.words(),
        total_rows: faker.number.int(10),
        seats_per_row: faker.number.int(10)
      })
    hallId = response.body.data.hall_id
    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
  });

  it('should delete a hall', async () => {
    const response = await request
      .delete(`/api/halls/${hallId}`)
      .set('Authorization', `Bearer ${token}`)
      
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });
});