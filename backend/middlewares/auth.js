const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('../errors/errorUnauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';
  if (!authorization || !authorization.startsWith(bearer)) {
    throw new ErrorUnauthorized('Необходимо авторизоваться!');
  }

  const token = authorization.replace(bearer, '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new ErrorUnauthorized('Необходимо авторизоваться!');
  }

  req.user = payload;
  next();
};

module.exports = auth;
