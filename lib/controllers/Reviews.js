const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { Review } = require('../models/Review');

module.exports = Router()
  .delete('/:id', authenticate, async (req, res, next) => {
    try {
      console.log(req.params.id);
      const data = await Review.delete(req.params.id);
      console.log(data);
      res.send(data);
    } catch (e) {
      next(e);
    }
  });
