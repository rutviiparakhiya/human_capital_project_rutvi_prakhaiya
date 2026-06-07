const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Import routes
const authRoutes = require('./routes/authRoutes');
const {
  pricesRouter,
  countriesRouter,
  indicatorsRouter,
  monthsRouter,
  yearsRouter,
  searchRouter,
  statsRouter,
  compareRouter
} = require('./routes/priceRoutes');
const {
  adminRouter,
  protectedRouter,
  jwtRouter
} = require('./routes/miscRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/prices', pricesRouter);
app.use('/api/countries', countriesRouter);
app.use('/api/indicators', indicatorsRouter);
app.use('/api/months', monthsRouter);
app.use('/api/years', yearsRouter);
app.use('/api/search', searchRouter);
app.use('/api/stats', statsRouter);
app.use('/api/compare', compareRouter);
app.use('/api/admin', adminRouter);
app.use('/api/protected', protectedRouter);
app.use('/api/jwt', jwtRouter);

// Health & utility routes
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/version', (req, res) => {
  res.status(200).json({
    success: true,
    version: '1.0.0'
  });
});

app.get('/metrics', (req, res) => {
  res.status(200).json({
    success: true,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage()
  });
});

app.get('/server-status', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'running',
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
});

// Error handler middleware
app.use(errorHandler);

// Export app
module.exports = app;