const pool = require('../db')

class reservationsService {
  async getReservations() {
    try {
      const result = await pool.query('SELECT * FROM reservations ORDER BY reservation_date ASC');
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addReservation(userId, seatIds) {
    try {
      // Add reservation
      const reservationPromises = seatIds.map(seatId => 
        pool.query('INSERT INTO reservations (user_id, seat_id) VALUES ($1, $2) RETURNING *', [userId, seatId])
      );
      const result = await Promise.all(reservationPromises);

      // Update seats status to reserved
      const updatePromises = seatIds.map(seatId => 
        pool.query('UPDATE seats SET status = $1 WHERE seat_id = $2', ['reserved', seatId])
      );
      await Promise.all(updatePromises);

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async getReservationById(reservationId) {
    try {
      const result = await pool.query('SELECT * FROM reservations WHERE reservation_id = $1', [reservationId]);
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

  async deleteReservation(reservationId) {
    try {
      // Delete reservation
      const result = await pool.query('UPDATE reservations SET status = $1 WHERE reservation_id = $2 RETURNING *', ['canceled', reservationId]);

      if (result.rows.length === 0) {
        return 'Reservation not found';
      }

      // Update seats status to available
      const updateSeats = await pool.query('UPDATE seats SET status = $1 WHERE seat_id = $2 RETURNING *', ['available', result.rows[0].seat_id]);

      if (updateSeats.rows.length === 0) {
        return 'Seat not found';
      }

      return `${result.rows[0].reservation_id} deleted, seat status updated to ${updateSeats.rows[0].status}`;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getShowtimeReservations(showtimeId) {
    try {
      const result = await pool.query('SELECT reservations.*, seats.*, showtimes.* FROM reservations JOIN seats ON reservations.seat_id = seats.seat_id JOIN showtimes ON seats.showtime_id = showtimes.showtime_id WHERE seats.showtime_id = $1;', [showtimeId]);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new reservationsService();