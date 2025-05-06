export {};
const express = require('express');
const morgan = require('morgan');
const logger = require('./utils/logger');
const config = require('./config');
const moviesRouter = require('./routes/movies');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

/**
 * Initialize and configure Express application.
 */

/**
 * Initialize and configure Express application.
 */
const app = express();

// HTTP request logging
if (config.env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));
}

app.use(express.json());
app.use('/movies', moviesRouter);

// Handle 404 for unmatched routes
app.use(notFoundHandler);

// Centralized error handling
app.use(errorHandler);

module.exports = app;