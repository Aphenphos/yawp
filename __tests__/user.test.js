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
const adminUser = {
  firstName: 'admin',
  lastName: 'admin',
  email: 'admin@admin',
  password: 'admin'
};


describe('tests user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('returns the users', async () => {
    const agent = request.agent(app);

    await UserService.create({ ...adminUser });
    await agent.post('/api/v1/users/sessions').send({ email:'admin@admin', password:'admin' });
    const resp = await agent.get('/api/v1/users');
    expect(resp.status).toBe(200);
  });
  it('makes a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(fakeUser);

    expect(res.body).toEqual({
      message: 'Signed In'
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
