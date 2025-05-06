export {};
const sqlite3 = require('sqlite3').verbose();
const config = require('./config');

// Initialize SQLite databases (read-only)
const moviesDb = new sqlite3.Database(
  config.db.movies,
  sqlite3.OPEN_READONLY
);
const ratingsDb = new sqlite3.Database(
  config.db.ratings,
  sqlite3.OPEN_READONLY
);

// Promise-based helpers
function all(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function get(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

module.exports = {
  allMovies: (sql, params) => all(moviesDb, sql, params),
  getMovie: (sql, params) => get(moviesDb, sql, params),
  allRatings: (sql, params) => all(ratingsDb, sql, params),
  getRating: (sql, params) => get(ratingsDb, sql, params),
};