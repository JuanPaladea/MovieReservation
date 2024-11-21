const pool = require('../db');

class MoviesService {
  async getMovies() {
    try {
      const query = 'SELECT * FROM movies';
      const movies = await pool.query(query);
      return movies.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMovieById(id) {
    try {
      const query = 'SELECT * FROM movies WHERE movie_id = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addMovie(title, genre, duration, rating, description, release_date, thumbnails) {
    try {
      const query = 'INSERT INTO movies (title, genre, duration, rating, description, release_date, thumbnails) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const result = await pool.query(query, [title, genre, duration, rating, description, release_date, thumbnails]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteMovie(id) {
    try {
      const query = 'DELETE FROM movies WHERE movie_id = $1 RETURNING *';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new MoviesService();