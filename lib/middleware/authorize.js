module.exports = async (req, res, next) => {
  try {
    if (!req.user || req.user.email !== 'admin@admin')
      throw new Error('You do not have permission');
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
