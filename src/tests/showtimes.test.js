const supertest = require('supertest');
const {faker} = require('@faker-js/faker');

const app = "http://localhost:4000";
const request = supertest(app);

let token
let showtimeId
let hallId

beforeAll(async () => {
  const response = await request
    .post('/api/session/login')
    .send({
      email: "test@email.com",
      password: "Test1234"})

  token = response.body.data.token

  const hall = await request
    .post('/api/halls')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: faker.lorem.words(),
      total_rows: 1,
      seats_per_row: 1
    })

  hallId = hall.body.data.hall_id
});

describe('Showtimes', () => {
  it('should get all showtimes', async () => {
    const response = await request
      .get('/api/showtimes')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toBeDefined()
  });

  it("should add a showtime", async () => {
    const response = await request
      .post('/api/showtimes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        movieId: faker.number.int(15),
        hallId: hallId,
        showDate: faker.date.recent(),
        showTime: "18:00:00",
        price: faker.number.int(100)
      })
    
    showtimeId = response.body.data.showtime_id
    expect(response.status).toBe(201)
    expect(response.body.data).toBeDefined()
  });

  it("should get a showtime by id", async () => {
    const response = await request
      .get(`/api/showtimes/${showtimeId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toBeDefined()
  });

  it("should delete a showtime", async () => {
    const response = await request
      .delete(`/api/showtimes/${showtimeId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toBeDefined()
  });

  it("should get all showtimes for a movie", async () => {
    const response = await request
      .get('/api/showtimes/movie/1')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toBeDefined()
  });

  it("should get all upcoming showtimes for a movie", async () => {
    const response = await request
      .get('/api/showtimes/upcoming/1')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toBeDefined()
  });
});

// Delete hall
afterAll(async () => {
  await request
    .delete(`/api/halls/${hallId}`)
    .set('Authorization', `Bearer ${token}`)
});