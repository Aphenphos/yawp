const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Restaurant = require('../models/Restaurant');

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
    const review = await Restaurant.insert(req.body);
    res.json(review);
  })
  .post('/', async (req, res) => {
    const restaurant = await Restaurant.insert(req.body);
    res.json(restaurant);
  })
;
