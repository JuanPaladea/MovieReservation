const pool = require('../db');

class MoviesService {
  async getMovies() {
    try {
      const query = 'SELECT * FROM movies';
      const [movies] = await pool.query(query);
      return movies;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addMovie(title, description, release_date) {
    try {
      const query = 'INSERT INTO movies (title, description, release_date) VALUES (?, ?, ?)';
      const [result] = await pool.query(query, [title, description, release_date]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new MoviesService();