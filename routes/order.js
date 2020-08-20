'use strict';

const { Router } = require('express');
const router = new Router();
const Product = require('../models/product');
const Order = require('../models/order');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', (req, res, next) => {
  const { address, token, basket } = req.body;
  const productIds = basket.map(item => item.productId);

  let total;

  // Loading all products to arrive at total price
  Product.find({ _id: productIds })
    .then(products => {
      // Calculating total price
      const amount = basket.reduce((sum, item) => {
        const product = products.find(prod => prod._id.toString() === item.productId);
        return sum + product.price.amount * item.quantity;
      }, 0);
      const currency = products[0].price.currency;
      total = {
        amount,
        currency
      };
      // Make charge to payment method

      return stripe.charges.create({
        amount: total.amount,
        currency: total.currency,
        source: token,
        description: 'Purchase in banana shop'
      });
    })
    .then(charge => {
      // Create an order document
      return Order.create({
        address,
        total,
        charge: charge.id,
        basket: basket.map(item => ({ ...item, product: item.productId }))
      });
    })
    .then(order => {
      // We're done, send order object to client
      res.json({ order });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
