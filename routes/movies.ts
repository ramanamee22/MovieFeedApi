import express from 'express';
import {
  validatePage,
  validateYear,
  validateGenre,
  validateMovieId,
  validateOrder,
} from '../middlewares/validation';
const router = express.Router();
const moviesController = require('../controllers/moviesController');

// List all movies (paginated)
router.get('/', validatePage, moviesController.listAllMovies);

// List movies by year (paginated, optional order=asc|desc)
router.get(
  '/year/:year',
  validateYear,
  validateOrder,
  validatePage,
  moviesController.moviesByYear
);

// List movies by genre (paginated)
router.get(
  '/genre/:genre',
  validateGenre,
  validatePage,
  moviesController.moviesByGenre
);

// Movie details by IMDb ID
router.get('/:id', validateMovieId, moviesController.movieDetails);

module.exports = router;