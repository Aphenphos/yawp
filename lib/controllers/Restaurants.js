const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Restaurant = require('../models/Restaurant');
const { Review } = require('../models/Review');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const restaurant = await Restaurant.getById(req.params.id);
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
  .post('/:id/reviews', authenticate, async (req, res) => {
    const restaurant_id = req.params.id;
    const user_id = req.user.id;
    const review = await Review.newReview({ ...req.body, restaurant_id, user_id });
    res.json(review);
  })
  .post('/', async (req, res) => {
    const restaurant = await Restaurant.insert(req.body);
    res.json(restaurant);
  })
;
