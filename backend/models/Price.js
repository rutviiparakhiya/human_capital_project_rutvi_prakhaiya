const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  indicator: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Price', priceSchema);
