const request = require('supertest');
const app = require('../../app');

describe('Movies API routes', () => {
  test('GET /movies returns paginated list', async () => {
    const res = await request(app).get('/movies?page=1');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta.page).toBe(1);
  });

  test('GET /movies/:id returns movie details', async () => {
    const res = await request(app).get('/movies/tt0076759');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.imdbId).toBe('tt0076759');
  });

  test('GET /movies/unknown returns 404 error', async () => {
    const res = await request(app).get('/movies/unknown_id');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toHaveProperty('message', 'Movie not found');
  });

  test('GET /movies?year=1977 returns list', async () => {
    const res = await request(app).get('/movies?year=1977&page=1&order=asc');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.meta.page).toBe(1);
  });

  test('GET /movies?genre=Drama returns list', async () => {
    const res = await request(app).get('/movies?genre=Drama&page=1');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.meta.page).toBe(1);
  });
});