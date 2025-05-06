/**
 * Custom API error class to standardize error responses.
 */
export {};
class ApiError extends Error {
  statusCode: number;
  details?: any;
  /**
   * @param {number} statusCode HTTP status code
   * @param {string} message Error message
   * @param {any} [details] Optional additional error details
   */
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;