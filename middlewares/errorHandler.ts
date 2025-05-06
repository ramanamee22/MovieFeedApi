export {};
const ApiError = require('../utils/createError');
const logger = require('../utils/logger');

/**
 * 404 handler for unmatched routes.
 */
function notFoundHandler(req, res, next) {
  next(new ApiError(404, 'Resource not found'));
}

/**
 * Central error handler. Sends standardized error response.
 */
function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    const { statusCode, message, details } = err;
    const errorPayload: any = { success: false, error: { message } };
    if (details) errorPayload.error.details = details;
    return res.status(statusCode).json(errorPayload);
  }
  logger.error(err);
  return res.status(500).json({
    success: false,
    error: { message: 'Internal server error' },
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};