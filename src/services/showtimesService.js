const pool = require('../db');

class ShowtimesService {
  async getShowtimes() {
    try {
      const [result] = await pool.query('SELECT * FROM showtimes');
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addShowtime(movieId, showtimeDate) {
    try {
      const [result] = await pool.query('INSERT INTO showtimes (movie_id, showtime_date) VALUES (?, ?)', [movieId, showtimeDate]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new ShowtimesService();