const pool = require('../db');

class MoviesService {
  async getMovies() {
    try {
      const movies = await pool.query('SELECT * FROM movies');
      return movies.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMovieById(id) {
    try {
      const result = await pool.query('SELECT * FROM movies WHERE movie_id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addMovie(title, genre, duration, rating, description, release_date, thumbnails) {
    try {
      const result = await pool.query('INSERT INTO movies (title, genre, duration, rating, description, release_date, thumbnails) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [title, genre, duration, rating, description, release_date, thumbnails]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateMovie(id, title, genre, duration, rating, description, release_date, thumbnails) {
    try {
      const result = await pool.query('UPDATE movies SET title = $1, genre = $2, duration = $3, rating = $4, description = $5, release_date = $6, thumbnails = $7 WHERE movie_id = $8 RETURNING *', [title, genre, duration, rating, description, release_date, thumbnails, id]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteMovie(id) {
    try {
      const result = await pool.query('DELETE FROM movies WHERE movie_id = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new MoviesService();