require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const CookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

// eslint-disable-next-line no-unused-vars
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(helmet());

app.use(express.json());
app.use(CookieParser());

app.use(cors({
  origin: ['http://novch.nomoredomains.xyz', 'https://novch.nomoredomains.xyz', 'http://localhost:3000', 'https://localhost:3000'],
  credentials: true,
}));

mongoose.connect(DB_URL);

app.use(requestLogger);
app.use(errorLogger);

app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
