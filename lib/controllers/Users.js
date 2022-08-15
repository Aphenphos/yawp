const UserService = require('../services/UserService');
const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const User = require('../models/User');

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/', [authenticate, authorize], async (req, res, next) => {
    try {
      const users = await User.getAll();
      res.send(users);
    } catch (error) {
      next(error);
    }
  });
