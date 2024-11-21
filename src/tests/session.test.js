const supertest = require('supertest');
const {faker} = require('@faker-js/faker');

const app = "http://localhost:3000";
const request = supertest(app);

let username = faker.internet.username();
let email = faker.internet.email();
let password = faker.internet.password();

describe('Session', () => {
  it('should register a user', async () => {
    const response = await request
      .post('/api/session/register')
      .send({
        username: username,
        email: email,
        password: password})

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
  });

  it("should try to register a user with an invalid email", async () => {
    const response = await request
      .post('/api/session/register')
      .send({
        username: username,
        email: 'invalidemail',
        password: password})

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
  });

  it("should try to register a user with an invalid password", async () => {
    const response = await request
      .post('/api/session/register')
      .send({
        username: username,
        email: email,
        password: '1234567'})

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
  });

  it("should try to register a user that already exists", async () => {
    const response = await request
      .post('/api/session/register')
      .send({
        username: username,
        email: email,
        password: password})

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
  });

  it('should login a user', async () => {
    const response = await request
      .post('/api/session/login')
      .send({
        email: email,
        password: password})

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it('should try to login a user with an invalid email', async () => {
    const response = await request
      .post('/api/session/login')
      .send({
        email: 'invalidemail',
        password: password})

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
  });

  it('should try to login a user with an invalid password', async () => {
    const response = await request
      .post('/api/session/login')
      .send({
        email: email,
        password: '1234567'})

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
  });

  it('should try to login a user that does not exist', async () => {
    const response = await request
      .post('/api/session/login')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password()})

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
  });
})
