const pool = require('../db')

class reservationsService {
  async addReservation(userId, userName, userEmail, showtimeId, seats, reservationDate) {
    try {
      const [result] = await pool.query('INSERT INTO reservations (user_id, customer_name, customer_email, showtime_id, seats, reservation_date) VALUES (?, ?, ?, ?, ?, ?)', [userId, userName, userEmail, showtimeId, seats, reservationDate]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new reservationsService();