const Price = require('../models/Price');

// @desc    Get all prices
// @route   GET /api/prices
// @access  Public
const getPrices = async (req, res) => {
  const prices = await Price.find({});
  res.json(prices);
};

// @desc    Get all countries
// @route   GET /api/countries
// @access  Public
const getCountries = async (req, res) => {
  const countries = await Price.distinct('country');
  res.json(countries);
};

// @desc    Get all indicators
// @route   GET /api/indicators
// @access  Public
const getIndicators = async (req, res) => {
  const indicators = await Price.distinct('indicator');
  res.json(indicators);
};

// @desc    Get all months
// @route   GET /api/months
// @access  Public
const getMonths = async (req, res) => {
  const months = await Price.distinct('month');
  res.json(months);
};

// @desc    Get all years
// @route   GET /api/years
// @access  Public
const getYears = async (req, res) => {
  const years = await Price.distinct('year');
  res.json(years);
};

// @desc    Search prices
// @route   GET /api/search
// @access  Public
const searchPrices = async (req, res) => {
  const { q } = req.query;
  const prices = await Price.find({
    $or: [
      { country: { $regex: q, $options: 'i' } },
      { indicator: { $regex: q, $options: 'i' } }
    ]
  });
  res.json(prices);
};

// @desc    Get stats
// @route   GET /api/stats
// @access  Public
const getStats = async (req, res) => {
  const count = await Price.countDocuments();
  const avgValue = await Price.aggregate([
    { $group: { _id: null, avg: { $avg: '$value' } } }
  ]);
  res.json({ count, avgValue: avgValue[0]?.avg || 0 });
};

// @desc    Compare data
// @route   GET /api/compare
// @access  Public
const compareData = async (req, res) => {
  const { countries, indicators } = req.query;
  const countryList = countries ? countries.split(',') : [];
  const indicatorList = indicators ? indicators.split(',') : [];

  const data = await Price.find({
    country: { $in: countryList },
    indicator: { $in: indicatorList }
  });
  res.json(data);
};

module.exports = {
  getPrices,
  getCountries,
  getIndicators,
  getMonths,
  getYears,
  searchPrices,
  getStats,
  compareData
};
