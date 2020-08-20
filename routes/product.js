'use strict';

const { Router } = require('express');
const router = new Router();
const Product = require('../models/product');

router.get('/list', (req, res, next) => {
  Product.find()
    .then(products => {
      res.json({ products });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
