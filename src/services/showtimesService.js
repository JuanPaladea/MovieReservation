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

  async addShowtime(movieId, hallId, show_date, show_time, price) {
    try {
      // Step 1: Get the hall's seat configuration (total rows and seats per row)
      const hallResult = await pool.query('SELECT total_rows, seats_per_row FROM halls WHERE hall_id = $1', [hallId]);
      const hall = hallResult.rows[0];
      const { total_rows, seats_per_row } = hall;

      // Step 2: Insert the new showtime
      const result = await pool.query('INSERT INTO showtimes (movie_id, hall_id, show_date, show_time, price) VALUES ($1, $2, $3, $4. $5) RETURNING *', [movieId, hallId, show_date, show_time, price]);

      // Step 3: Insert seats for the showtime
      for (let row = 1; row <= total_rows; row++) {
        for (let seat = 1; seat <= seats_per_row; seat++) {
          await pool.query('INSERT INTO seats (showtime_id, row_number, seat_number) VALUES ($1, $2, $3)', [result.rows[0].showtime_id, row, seat]);
        }
      }
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
}

module.exports = new ShowtimesService();