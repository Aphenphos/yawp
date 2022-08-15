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

const logIn = async (userInfo = {}) => {
  const password = userInfo.password;
  const agent = request.agent(app);

  const user = await UserService.create({ ...userInfo });

  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};



describe('tests user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('returns the users', async () => {
    const [agent] = await logIn(adminUser);
    const resp = await agent.get('/api/v1/users');
    expect(resp.status).toBe(200);
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
