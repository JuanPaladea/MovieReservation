const pool = require('../db')

class seatsService {
  async getSeatById(seatId) {
    try {
      const result = await pool.query('SELECT * FROM seats WHERE seat_id = $1', [seatId]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getSeatsForShowtime(showtimeId) {
    try {
      const result = await pool.query('SELECT * FROM seats WHERE showtime_id = $1', [showtimeId]);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async checkSeatAvailability(seatId) {
    try {
      const result = await pool.query("SELECT * FROM seats WHERE seat_id = $1 AND status IN ('reserved', 'completed')", [seatId]);
      return result.rows.length === 0;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateSeatStatus(seatId, status) {
    try {
      const result = await pool.query('UPDATE seats SET status = $1 WHERE seat_id = $2 RETURNING *', [status, seatId]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new seatsService();