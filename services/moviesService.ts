export {};
const { allMovies, getMovie, getRating } = require('../db');
const CustomApiError = require('../utils/createError');
const { formatBudget: formatMovieBudget } = require('../utils/format');

// Define TypeScript interfaces for response types
interface Movie {
  imdbId: string;
  title: string;
  genres: string[];
  releaseDate: string;
  budget: string;
}

interface MovieDetails extends Movie {
  description: string;
  runtime: number;
  averageRating: number;
  originalLanguage: string;
  productionCompanies: string[];
}

interface PaginatedResponse<T> {
  page: number;
  data: T[];
}

/**
 * List all movies with pagination
 * @param {number} page
 * @returns {Promise<PaginatedResponse<Movie>>} list of movies and paging info
 */
async function listAllMovies(page = 1): Promise<PaginatedResponse<Movie>> {
  if (page < 1) page = 1;
  const limit = 50;
  const offset = (page - 1) * limit;
  const sql = `
    SELECT imdbId, title, genres, releaseDate, budget
    FROM movies
    ORDER BY title ASC
    LIMIT ? OFFSET ?
  `;
  const rows = await allMovies(sql, [limit, offset]);
  const data = rows.map((row) => ({
    imdbId: row.imdbId,
    title: row.title,
    genres: JSON.parse(row.genres).map((g) => g.name),
    releaseDate: row.releaseDate,
    budget: formatMovieBudget(row.budget),
  }));
  return { page, data };
}

/**
 * Get details for a single movie by IMDb ID
 * @param {string} imdbId
 * @returns {Promise<MovieDetails>} detailed movie data
 */
async function getMovieDetails(imdbId: string): Promise<MovieDetails> {
  const sql = 'SELECT * FROM movies WHERE imdbId = ?';
  const movie = await getMovie(sql, [imdbId]);
  if (!movie) throw new CustomApiError(404, 'Movie not found');
  // Calculate average rating
  const ratingRow = await getRating(
    'SELECT AVG(rating) as avgRating FROM ratings WHERE movieId = ?',
    [movie.movieId]
  );
  const avg = ratingRow && ratingRow.avgRating ? parseFloat(ratingRow.avgRating) : 0;
  return {
    imdbId: movie.imdbId,
    title: movie.title,
    description: movie.overview,
    releaseDate: movie.releaseDate,
    budget: formatMovieBudget(movie.budget),
    runtime: movie.runtime,
    averageRating: parseFloat(avg.toFixed(1)),
    genres: JSON.parse(movie.genres).map((g) => g.name),
    originalLanguage: movie.language,
    productionCompanies: JSON.parse(movie.productionCompanies).map((pc) => pc.name),
  };
}

/**
 * List movies by year with pagination and optional sort order
 * @param {string} year Four-digit year string
 * @param {number} page
 * @param {string} order 'ASC' or 'DESC'
 * @returns {Promise<PaginatedResponse<Movie>>} list of movies and paging info
 */
async function listMoviesByYear(year: string, page = 1, order = 'ASC'): Promise<PaginatedResponse<Movie>> {
  if (page < 1) page = 1;
  const limit = 50;
  const offset = (page - 1) * limit;
  const sql = `
    SELECT imdbId, title, genres, releaseDate, budget
    FROM movies
    WHERE substr(releaseDate, 1, 4) = ?
    ORDER BY releaseDate ${order}
    LIMIT ? OFFSET ?
  `;
  const rows = await allMovies(sql, [year, limit, offset]);
  const data = rows.map((row) => ({
    imdbId: row.imdbId,
    title: row.title,
    genres: JSON.parse(row.genres).map((g) => g.name),
    releaseDate: row.releaseDate,
    budget: formatMovieBudget(row.budget),
  }));
  return { page, data };
}

/**
 * List movies by genre with pagination
 * @param {string} genre Genre name (case-insensitive)
 * @param {number} page
 * @returns {Promise<PaginatedResponse<Movie>>} list of movies and paging info
 */
async function listMoviesByGenre(genre: string, page = 1): Promise<PaginatedResponse<Movie>> {
  if (page < 1) page = 1;
  const limit = 50;
  const offset = (page - 1) * limit;
  const genreLower = genre.toLowerCase();
  // Case-insensitive match against JSON "name": "<genre>"
  const likePattern = `%\"name\": \"${genreLower}\"%`;
  const sql = `
    SELECT imdbId, title, genres, releaseDate, budget
    FROM movies
    WHERE lower(genres) LIKE ?
    ORDER BY title ASC
    LIMIT ? OFFSET ?
  `;
  const rows = await allMovies(sql, [likePattern, limit, offset]);
  const data = rows.map((row) => ({
    imdbId: row.imdbId,
    title: row.title,
    genres: JSON.parse(row.genres).map((g) => g.name),
    releaseDate: row.releaseDate,
    budget: formatMovieBudget(row.budget),
  }));
  return { page, data };
}

module.exports = {
  listAllMovies,
  getMovieDetails,
  listMoviesByYear,
  listMoviesByGenre,
};