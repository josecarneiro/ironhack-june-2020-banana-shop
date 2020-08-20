'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  weight: Number,
  origin: String,
  picture: String,
  price: {
    amount: Number,
    currency: {
      type: String,
      enum: ['EUR', 'USD', 'NOK']
    }
  }
});

module.exports = mongoose.model('Product', schema);
