import { Request, Response, NextFunction } from 'express';
const ApiError = require('../utils/createError');

/**
 * Validate that the 'page' query parameter, if provided, is a positive integer.
 */
export const validatePage = (req: Request, res: Response, next: NextFunction) => {
  const { page } = req.query;
  if (page !== undefined) {
    const pageStr = String(page);
    const pageNum = parseInt(pageStr, 10);
    if (isNaN(pageNum) || pageNum < 1) {
      return next(new ApiError(400, 'Invalid page parameter', {
        param: 'page',
        message: 'Page must be an integer greater than or equal to 1',
      }));
    }
    // replace query param with numeric value for downstream handlers
    req.query.page = pageNum.toString();
  }
  next();
};

/**
 * Validate that 'year' path parameter is a four-digit year within a reasonable range.
 */
export const validateYear = (req: Request, res: Response, next: NextFunction) => {
  const { year } = req.params;
  const yearRegex = /^\d{4}$/;
  const currentYear = new Date().getFullYear();
  if (!yearRegex.test(year) || Number(year) < 1800 || Number(year) > currentYear) {
    return next(new ApiError(400, 'Invalid year parameter', {
      param: 'year',
      message: `Year must be a 4-digit number between 1800 and ${currentYear}`,
    }));
  }
  next();
};

/**
 * Validate that 'genre' path parameter is a non-empty string of letters and spaces.
 */
export const validateGenre = (req: Request, res: Response, next: NextFunction) => {
  const { genre } = req.params;
  if (!genre || typeof genre !== 'string' || !/^[a-zA-Z\s]+$/.test(genre)) {
    return next(new ApiError(400, 'Invalid genre parameter', {
      param: 'genre',
      message: 'Genre must be a non-empty string containing only letters and spaces',
    }));
  }
  next();
};

/**
 * Validate that 'id' path parameter contains only safe characters.
 */
export const validateMovieId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idRegex = /^[A-Za-z0-9_-]+$/;
  if (!id || typeof id !== 'string' || !idRegex.test(id)) {
    return next(new ApiError(400, 'Invalid movie ID parameter', {
      param: 'id',
      message: 'Movie ID must contain only letters, numbers, underscores, or hyphens',
    }));
  }
  next();
};

/**
 * Validate that 'order' query parameter, if provided, is 'asc' or 'desc'.
 */
export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  const { order } = req.query;
  if (order !== undefined) {
    const orderStr = String(order).toLowerCase();
    if (orderStr !== 'asc' && orderStr !== 'desc') {
      return next(new ApiError(400, 'Invalid order parameter', {
        param: 'order',
        message: 'Order must be either asc or desc',
      }));
    }
    req.query.order = orderStr;
  }
  next();
};