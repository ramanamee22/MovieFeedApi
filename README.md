# MovieFeed API

## Overview

The **MovieFeed API** is a RESTful API built on top of SQLite databases to provide movie-related data. It supports various endpoints to fetch movie details, list movies by genre, year, and more. The API is designed to be extensible, testable, and adheres to best practices for modern web applications.

---

## Features

- **List All Movies**: Paginated list of movies with details like IMDb ID, title, genres, release date, and budget.
- **Movie Details**: Fetch detailed information about a specific movie, including ratings and production details.
- **Movies By Year**: Filter movies by release year using query parameters (`year` and optional `order`).
- **Movies By Genre**: Filter movies by genre using query parameters (`genre`).

---

## Prerequisites

- An IDE or text editor of your choice.
- [SQLite3](http://www.sqlitetutorial.net/) installed on your system.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/MovieFeedApi.git
   cd MovieFeedApi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure the SQLite databases are available in the `db/` directory:
   - `movies.db`
   - `ratings.db`

  

4. Start the server:
   ```bash
   npm run build
   npm start
   ```

5. The API will be available at `http://localhost:3000`.

---

## Endpoints

### 1. **List All Movies**
   - **Endpoint**: `GET /movies`
   - **Query Params**: 
     - `page` (optional): Page number (default: 1).
   - **Response**:
     ```json
     {
       "data": [
         {
           "imdbId": "tt1234567",
           "title": "Movie Title",
           "genres": ["Action", "Drama"],
           "releaseDate": "2025-01-01",
           "budget": "$10,000,000"
         }
       ],
       "page": 1
     }
     ```

### 2. **Movie Details**
   - **Endpoint**: `GET /movies/:id`
   - **Path Params**:
     - `id`: IMDb ID of the movie.
   - **Response**:
     ```json
     {
       "imdbId": "tt1234567",
       "title": "Movie Title",
       "description": "Movie description...",
       "releaseDate": "2025-01-01",
       "budget": "$10,000,000",
       "runtime": "120 minutes",
       "averageRating": 8.5,
       "genres": ["Action", "Drama"],
       "originalLanguage": "English",
       "productionCompanies": ["Company A", "Company B"]
     }
     ```

### 3. **Movies By Year**
   - **Endpoint**: `GET /movies`
   - **Query Params**:
     - `year` (optional): Year of release.
     - `page` (optional): Page number (default: 1).
     - `order` (optional): Sorting order (`asc` or `desc`).
   - **Response**: Similar to "List All Movies".

### 4. **Movies By Genre**
   - **Endpoint**: `GET /movies`
   - **Query Params**:
     - `genre` (optional): Genre name.
     - `page` (optional): Page number (default: 1).
   - **Response**: Similar to "List All Movies".

---

## Testing

Run the test suite to ensure the API works as expected:
```bash
npm test
```

Code coverage reports are generated using [Istanbul](https://istanbul.js.org/) and can be found in the `coverage/` directory.

---
