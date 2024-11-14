const pool = require('../db')

class reservationsService {
  async addReservation(userId, showtimeId, seat_numbers) {
    try {
      const result = await pool.query('INSERT INTO reservations (user_id, showtime_id, seat_number) VALUES $1', [userId, showtimeId, seat_numbers]);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getReservations() {
    try {
      const result = await pool.query('SELECT * FROM reservations ORDER BY reservation_date ASC');
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async getReservationById(reservationId) {
    try {
      const result = await pool.query('SELECT * FROM reservations WHERE id = $1', [reservationId]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async getUserReservations(userId) {
    try {
      const result = await pool.query('SELECT * FROM reservations WHERE user_id = $1 ORDER BY reservation_date ASC', [userId]);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getShowtimeReservations(showtimeId) {
    try {
      const result = await pool.query('SELECT * FROM reservations WHERE showtime_id = $1 ORDER BY reservation_date ASC', [showtimeId]);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async checkSeatAvailability(showtimeId, seat_number) {
    try {
      const result = await pool.query('SELECT * FROM reservations WHERE showtime_id = $1 AND seat_number = $2', [showtimeId, seat_number]);
      return result.rows.length === 0;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateReservationStatus(reservationId, status) {
    try {
      const result = await pool.query('UPDATE reservations SET status = $1 WHERE id = $2 RETURNING *', [status, reservationId]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteReservation(reservationId) {
    try {
      const result = await pool.query('DELETE FROM reservations WHERE id = $1 RETURNING *', [reservationId]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async countShowtimeReservations(showtimeId) {
    try {
      const result = await pool.query('SELECT COUNT(*) FROM reservations WHERE showtime_id = $1', [showtimeId]);
      return parseInt(result.rows[0].count);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
}

module.exports = new reservationsService();