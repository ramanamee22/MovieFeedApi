export {};
const { createLogger, format, transports } = require('winston');
const config = require('../config');

// Determine current environment
const env = config.env;
// Set log level: debug in development, info in production, override with LOG_LEVEL
const level = process.env.LOG_LEVEL || (env === 'development' ? 'debug' : 'info');

// Configure Winston logger
const logger = createLogger({
  level,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: env === 'development'
        ? format.combine(format.colorize(), format.simple())
        : format.json()
    }),
    // In production, log errors to a file
    ...(env === 'production'
      ? [new transports.File({ filename: 'logs/error.log', level: 'error' })]
      : [])
  ],
});

module.exports = logger;