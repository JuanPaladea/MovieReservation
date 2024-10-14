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
}

module.exports = new MoviesService();