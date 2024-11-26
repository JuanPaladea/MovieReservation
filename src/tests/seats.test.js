const supertest = require('supertest');

const app = "http://localhost:4000";
const request = supertest(app);

let token

beforeAll(async () => {
  const response = await request
    .post('/api/session/login')
    .send({
      email: "test@email.com",
      password: "Test1234"})

  token = response.body.data.token
});

describe('Seats', () => {
  it('should get a seat by id', async () => {
    const response = await request
      .get('/api/seats/9050')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toBeDefined()
  });

  it('should get all seats for a showtime', async () => {
    const response = await request
      .get('/api/seats/showtime/136')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toBeDefined()
  });

  it('should check seat availability', async () => {
    const response = await request
      .get('/api/seats/availability/9050')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toBeDefined()
  });

});