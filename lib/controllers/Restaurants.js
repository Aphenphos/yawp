const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Restaurant = require('../models/Restaurant');
const { Review } = require('../models/Review');

module.exports = Router()
  .get('/:restId', async (req, res) => {
    const restaurant = await Restaurant.getById(req.params.restId);
    res.json(restaurant);
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Restaurant.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/:restId/reviews', authenticate, async (req, res) => {
    const restaurant_id = req.params.restId;
    const user_id = req.user.id;
    const review = await Review.newReview({ ...req.body, restaurant_id, user_id });
    res.json(review);
  })
  .post('/', async (req, res) => {
    const restaurant = await Restaurant.insert(req.body);
    res.json(restaurant);
  })
;
