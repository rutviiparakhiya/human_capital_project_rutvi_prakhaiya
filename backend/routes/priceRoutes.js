const express = require('express');
const router = express.Router();
const {
  getPrices,
  getCountries,
  getIndicators,
  getMonths,
  getYears,
  searchPrices,
  getStats,
  compareData
} = require('../controllers/priceController');

// We can export individual routers or one router that handles different sub-paths
// But the user wants them mounted at specific base paths in server.js

const pricesRouter = express.Router();
pricesRouter.get('/', getPrices);

const countriesRouter = express.Router();
countriesRouter.get('/', getCountries);

const indicatorsRouter = express.Router();
indicatorsRouter.get('/', getIndicators);

const monthsRouter = express.Router();
monthsRouter.get('/', getMonths);

const yearsRouter = express.Router();
yearsRouter.get('/', getYears);

const searchRouter = express.Router();
searchRouter.get('/', searchPrices);

const statsRouter = express.Router();
statsRouter.get('/', getStats);

const compareRouter = express.Router();
compareRouter.get('/', compareData);

module.exports = {
  pricesRouter,
  countriesRouter,
  indicatorsRouter,
  monthsRouter,
  yearsRouter,
  searchRouter,
  statsRouter,
  compareRouter
};
