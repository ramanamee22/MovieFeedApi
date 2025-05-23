export {};
const movieService = require('../services/moviesService');
const { success, badRequest } = require('../utils/responseHandler');

/**
 * GET /movies
 * List all movies (paginated)
 */
exports.listAllMovies = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const { page: currentPage, data } = await movieService.listAllMovies(page);
    return success(res, data, { page: currentPage });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /movies/:id
 * Get movie details by IMDb ID
 */
exports.movieDetails = async (req, res, next) => {
  try {
    const imdbId = req.params.id;
    if (!imdbId) badRequest('IMDb ID is required');
    const data = await movieService.getMovieDetails(imdbId);
    return success(res, data);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /movies/year/:year
 * List movies by year (paginated, optional order=asc|desc)
 */
exports.moviesByYear = async (req, res, next) => {
  try {
    const year = req.params.year;
    const page = parseInt(req.query.page, 10) || 1;
    const order = req.query.order && req.query.order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    const { page: currentPage, data } = await movieService.listMoviesByYear(year, page, order);
    return success(res, data, { page: currentPage });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /movies/genre/:genre
 * List movies by genre (paginated)
 */
exports.moviesByGenre = async (req, res, next) => {
  try {
    const genre = req.params.genre;
    const page = parseInt(req.query.page, 10) || 1;
    const { page: currentPage, data } = await movieService.listMoviesByGenre(genre, page);
    return success(res, data, { page: currentPage });
  } catch (err) {
    next(err);
  }
};