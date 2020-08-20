'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const serveFavicon = require('serve-favicon');
const cors = require('cors');

const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');

const app = express();

app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true
  })
);
app.use(logger('dev'));
app.use(express.json());

app.use('/product', productRouter);
app.use('/order', orderRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
