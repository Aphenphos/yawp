const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const Restaurant = require('../lib/models/Restaurant');

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

  it('should make sure restaurants are got properly', async () => {
    const resp = await request(app).get('/api/v1/restaurants');
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(2);
  });

  it('returns specific restaurant page', async () => {
    const res = await request(app).get('/api/v1/restaurants/2');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: '2',
      name: 'BurgerKing',
      food_type: 'Burgers',
      restaurants_reviews: expect.any(Array)
    });
  });

  it('posts a new restaurant', async () => {
    const resp = await request(app)
      .post('/api/v1/restaurants')
      .send({ name: 'Burger King', food_type: 'Burgers' });
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      name: 'Burger King',
      food_type: 'Burgers'
    });
  }); 
  it('posts a new restaurant review', async () => {
    const [agent] = await logIn(fakeUser);
    const resp = await agent
      .post('/api/v1/restaurants/2/reviews')
      .send({ star_rating: 5 });
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      star_rating: 5,
      restaurant_id: expect.any(String),
      user_id: expect.any(String)
    });
  }); 

  afterAll(() => {
    pool.end();
  });
});
