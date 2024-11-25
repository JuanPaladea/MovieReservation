const supertest = require('supertest');
const {faker} = require('@faker-js/faker');

const app = "http://localhost:4000";
const request = supertest(app);

let token
let movieId

beforeAll(async () => {
  const response = await request
    .post('/api/session/login')
    .send({
      email: "test@email.com",
      password: "Test1234"})

  token = response.body.data.token
});

describe('Movies', () => {
  it('should return a list of movies', async () => {
    const response = await request
      .get('/api/movies')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined()
  });

  it('should return a movie by id', async () => {
    const response = await request
      .get('/api/movies/1')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined()
  });

  it('should add a movie', async () => {
    const response = await request
      .post('/api/movies')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: faker.lorem.words(),
        genre: faker.lorem.word(),
        duration: faker.number.int(200),
        rating: faker.number.int(100),
        description: faker.lorem.sentence(),
        release_date: faker.date.recent(),
        thumnails: faker.image.url()
      })

    movieId = response.body.data.movie_id
    expect(response.status).toBe(201);
    expect(response.body.data).toBeDefined()
  });

  it('should update a movie', async () => {
    const response = await request
      .put(`/api/movies/${movieId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: faker.lorem.words(),
        genre: faker.lorem.word(),
        duration: faker.number.int(200),
        rating: faker.number.int(100),
        description: faker.lorem.sentence(),
        release_date: faker.date.recent(),
        thumnails: faker.image.url()
      })

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined()
  });

  it('should delete a movie', async () => {
    const response = await request
      .delete(`/api/movies/${movieId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined()
  });
})