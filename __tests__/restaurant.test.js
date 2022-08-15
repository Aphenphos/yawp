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

const logIn = async (userInfo = {}) => {
  const password = userInfo.password ?? fakeUser.password;

  const agent = request.agent(app);

  const user = await UserService.create({ ...fakeUser });

  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};


describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should make sure secrets are got properly', async () => {
    const [agent, user] = await logIn();
    console.log(user);
    const resp = await agent.get('/api/v1/restaurants');
  
    expect(resp.body).toEqual([]);
  });
  afterAll(() => {
    pool.end();
  });
});
