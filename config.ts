export {};
const path = require('path');

/**
 * Application configuration. Environment variables override defaults.
 */
module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  db: {
    movies: process.env.MOVIES_DB || path.join(process.cwd(), 'db', 'movies.db'),
    ratings: process.env.RATINGS_DB || path.join(process.cwd(), 'db', 'ratings.db'),
  },
};