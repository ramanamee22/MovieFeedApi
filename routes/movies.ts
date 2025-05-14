import express from 'express';
const router = express.Router();
const moviesController = require('../controllers/moviesController');

// List all movies (paginated)
router.get('/', moviesController.listAllMovies);

// List movies by year (paginated, optional order=asc|desc)
router.get('/year/:year', moviesController.moviesByYear);

// List movies by genre (paginated)
router.get('/genre/:genre', moviesController.moviesByGenre);

// Movie details by IMDb ID
router.get('/:id', moviesController.movieDetails);

module.exports = router;