const movieService = require('../../services/moviesService');

describe('moviesService', () => {
  test('listAllMovies returns page and data array', async () => {
    const { page, data } = await movieService.listAllMovies(1);
    expect(page).toBe(1);
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      const movie = data[0];
      expect(movie).toHaveProperty('imdbId');
      expect(movie).toHaveProperty('title');
      expect(Array.isArray(movie.genres)).toBe(true);
      expect(movie).toHaveProperty('releaseDate');
      expect(movie).toHaveProperty('budget');
    }
  });

  test('getMovieDetails returns detailed movie object', async () => {
    const detail = await movieService.getMovieDetails('tt0076759');
    expect(detail).toHaveProperty('imdbId', 'tt0076759');
    expect(detail).toHaveProperty('title');
    expect(detail).toHaveProperty('description');
    expect(detail).toHaveProperty('releaseDate');
    expect(detail).toHaveProperty('budget');
    expect(detail).toHaveProperty('runtime');
    expect(detail).toHaveProperty('averageRating');
    expect(Array.isArray(detail.genres)).toBe(true);
    expect(Array.isArray(detail.productionCompanies)).toBe(true);
  });
});