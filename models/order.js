'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  address: String,
  total: {
    amount: Number,
    currency: {
      type: String,
      enum: ['EUR', 'USD', 'NOK']
    }
  },
  basket: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number
    }
  ],
  charge: String
});

module.exports = mongoose.model('Order', schema);
