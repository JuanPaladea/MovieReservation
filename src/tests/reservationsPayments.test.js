const supertest = require('supertest');

const app = "http://localhost:4000";
const request = supertest(app);

let token
let reservationId
let paymentId

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
        seatIds: [9057],
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
      .get('/api/reservations/user')
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

  it('should add a payment', async () => {
    const response = await request
      .post('/api/payments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 100,
        paymentMethod: 'cash',
        paymentStatus: 'completed',
        transactionId: '1234',
        reservationIds: [reservationId]
      })

    paymentId = response.body.data.payment_id
    expect(response.status).toBe(201);
    expect(response.body.data).toBeDefined()
  });

  it('should get a payment by id', async () => {
    const response = await request
      .get(`/api/payments/${paymentId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined()
  });

  it("should get all reservations for a payment", async () => {
    const response = await request
      .get(`/api/payments/${paymentId}/reservations`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined()
  })

  it ('should get all payments', async () => {
    const response = await request
      .get('/api/payments')
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

  it('should delete a payment', async () => {
    const response = await request
      .delete(`/api/payments/${paymentId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
  });
});