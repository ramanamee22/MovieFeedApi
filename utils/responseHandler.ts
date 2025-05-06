export {};
const ApiError = require('./createError');

/**
 * Send a standardized success response.
 * @param {import('express').Response} res
 * @param {any} data
 * @param {object} [meta]
 */
function success(res, data, meta) {
  const payload: any = { success: true, data };
  if (meta) payload.meta = meta;
  return res.json(payload);
}

/**
 * Shortcut to throw a 400 Bad Request
 */
function badRequest(message, details) {
  throw new ApiError(400, message, details);
}

module.exports = {
  success,
  badRequest,
};