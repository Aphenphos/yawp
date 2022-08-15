const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const fakeUser = {
  firstName: 'Mr',
  lastName: 'Man',
  email: 'mrman@man.com',
  password: 'imtheman'
};


describe('tests user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('returns the users', async () => {
    const resp = await request(app).get('/api/v1/users');
    expect(resp.status).toBe(401);
  });
  it('makes a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(fakeUser);
    const { firstName, lastName, email } = fakeUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email
    });
  });
  it('logs in existing user', async () => {
    await request(app).post('/api/v1/users').send(fakeUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'mrman@man.com', password: 'imtheman' });
    expect(res.status).toEqual(200);
  });
  afterAll(() => {
    pool.end();
  });
});
