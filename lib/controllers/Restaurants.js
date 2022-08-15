const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Restaurant = require('../models/Restaurant');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const data = await Restaurant.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
