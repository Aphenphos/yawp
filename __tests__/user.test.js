const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { get } = require('../lib/app');

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
  afterAll(() => {
    pool.end();
  });
});
