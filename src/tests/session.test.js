const supertest = require('supertest');
const {faker} = require('@faker-js/faker');

const app = "http://localhost:4000";
const request = supertest(app);

let username = faker.internet.username();
let email = faker.internet.email();

let userId

describe('Session', () => {
  it('should register a user', async () => {
    const response = await request
      .post('/api/session/register')
      .send({
        username: username,
        email: email,
        password: "Test1234"})

    userId = response.body.data.user_id
    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
  });

  it("should try to register a user with an invalid email", async () => {
    const response = await request
      .post('/api/session/register')
      .send({
        username: username,
        email: 'invalidemail',
        password: "Test1234"})

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
        password: "Test1234"})

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
  });

  it('should login a user', async () => {
    const response = await request
      .post('/api/session/login')
      .send({
        email: email,
        password: "Test1234"})
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it('should try to login a user with an invalid email', async () => {
    const response = await request
      .post('/api/session/login')
      .send({
        email: 'invalidemail',
        password: "Test1234"})

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

  it('should delete a user', async () => {
    const token = await request
      .post('/api/session/login')
      .send({
        email: "test@email.com",
        password: "Test1234"})
      .then(response => response.body.data.token)
       
    const response = await request
      .delete(`/api/session/${userId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });
})
