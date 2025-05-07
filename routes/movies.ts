import express from 'express';
const router = express.Router();
const moviesController = require('../controllers/moviesController');

// List all movies (paginated) with optional filters via query params: year, genre, order
router.get('/', moviesController.listAllMovies);

// Movie details by IMDb ID
router.get('/:id', moviesController.movieDetails);

module.exports = router;