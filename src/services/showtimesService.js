const pool = require('../db');

class ShowtimesService {
  async getShowtimes() {
    try {
      const result = await pool.query('SELECT * FROM showtimes');
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getShowtimeById(showtimeId) {
    try {
      const result = await pool.query('SELECT * FROM showtimes WHERE showtime_id = $1', [showtimeId]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMovieShowtimes(movieId) {
    try {
      const result = await pool.query('SELECT * FROM showtimes WHERE movie_id = $1 ORDER BY show_date ASC', [movieId]);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUpcomingMovieShowtimes(movieId) {
    try {
      const result = await pool.query('SELECT * FROM showtimes WHERE movie_id = $1 AND show_date >= CURRENT_DATE ORDER BY show_date ASC', [movieId]);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addShowtime(movieId, showDate, show_time, screen_number, available_seats) {
    try {
      const result = await pool.query('INSERT INTO showtimes (movie_id, show_date, show_time, screen_number, available_seats) VALUES ($1, $2, $3, $4, $5) RETURNING *', [movieId, showDate, show_time, screen_number, available_seats]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteShowtime(showtimeId) {
    try {
      const result = await pool.query('DELETE FROM showtimes WHERE showtime_id = $1 RETURNING *', [showtimeId]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new ShowtimesService();