const supertest = require('supertest');
const {faker} = require('@faker-js/faker');

const app = "http://localhost:4000";
const request = supertest(app);

let token
let reservationId

beforeAll(async () => {
  const response = await request
    .post('/api/session/login')
    .send({
      email: "test@email.com",
      password: "Test1234"})

  token = response.body.data.token
});

describe('Reservations', () => {
  it('should return a list of reservations', async () => {
    const response = await request
      .get('/api/reservations')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined()
  });
  
  it('should add a reservation', async () => {
    const response = await request
      .post('/api/reservations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        seatIds: [9050],
      })

    reservationId = response.body.data[0].reservation_id
    expect(response.status).toBe(201);
    expect(response.body.data).toBeDefined()
  });

  it('should return a reservation by id', async () => {
    const response = await request
      .get(`/api/reservations/${reservationId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined()
  });
  
  it('should return a list of user reservations', async () => {
    const response = await request
      .get('/api/reservations/user/7')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined()
  });

  it('should return a list of showtime reservations', async () => {
    const response = await request
      .get('/api/reservations/showtime/136')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined()
  });

  it('should delete a reservation', async () => {
    const response = await request
      .delete(`/api/reservations/${reservationId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
  });
});