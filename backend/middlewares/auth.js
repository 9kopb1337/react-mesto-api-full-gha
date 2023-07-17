const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('../errors/errorUnauthorized');

const auth = (req, res, next) => {
  let token;

  try {
    token = req.cookies.jwt;
  } catch (err) {
    throw new ErrorUnauthorized('Необходимо авторизоваться!');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new ErrorUnauthorized('Необходимо авторизоваться!');
  }

  req.user = payload;
  next();
};

module.exports = auth;
