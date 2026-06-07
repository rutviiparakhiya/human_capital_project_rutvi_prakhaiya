const express = require('express');
const { protect, admin } = require('../middlewares/auth');
const {
  getAdminData,
  getProtectedData,
  verifyToken
} = require('../controllers/miscController');

const adminRouter = express.Router();
adminRouter.get('/', protect, admin, getAdminData);

const protectedRouter = express.Router();
protectedRouter.get('/', protect, getProtectedData);

const jwtRouter = express.Router();
jwtRouter.get('/verify', protect, verifyToken);

module.exports = {
  adminRouter,
  protectedRouter,
  jwtRouter
};
