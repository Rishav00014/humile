const config = require('./config');

module.exports = () => {
  return (req, res, next) => {
    const token = req.body.key || req.query.key || req.headers.key;
    if (token) {
      if (token == config.SECRET_KEY) return next();
      else
        return res
          .status(401)
          .send({ status: false, error: 'Unauthorized access' });
    } else
      return res
        .status(401)
        .send({ status: false, error: 'Unauthorized access' });
  };
};
