const supertest = require('supertest');
const {faker} = require('@faker-js/faker');

const app = "http://localhost:4000";
const request = supertest(app);

let token

