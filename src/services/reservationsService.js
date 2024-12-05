const pool = require('../db')

class reservationsService {
  async getReservations(page, size) {
    try {
      const offset = (page - 1) * size;
      const result = await pool.query('SELECT * FROM reservations ORDER BY reservation_date ASC LIMIT $1 OFFSET $2', [size, offset]);
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

      const reservations = result.map(res => res.rows[0]);

      return reservations;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async getReservationById(reservationId) {
    try {
      // Join reservations with seats trough seat_id; and users through user_id; and seat_id with showtimes trough showtime_id (in seats table) and movies trough movie_id (in showtimes table)
      const result = await pool.query('SELECT reservations.*, seats.*, showtimes.*, movies.* FROM reservations JOIN seats ON reservations.seat_id = seats.seat_id JOIN showtimes ON seats.showtime_id = showtimes.showtime_id JOIN movies ON showtimes.movie_id = movies.movie_id WHERE reservation_id = $1', [reservationId]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async getUserReservations(userId, page, size) {
    try {
      const offset = (page - 1) * size;
      const result = await pool.query('SELECT * FROM reservations WHERE user_id = $1 ORDER BY reservation_date DESC LIMIT $2 OFFSET $3', [userId, size, offset]);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }  

  async deleteReservation(userId, reservationId) {    
    try {
      const userReservation = await pool.query('SELECT * FROM reservations WHERE reservation_id = $1', [reservationId]);

      if (userReservation.rows[0].user_id !== userId) {
        throw new Error('Unauthorized, reservation does not belong to user');
      }

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

  async getShowtimeReservations(showtimeId, page, size) {
    try {
      const offset = (page - 1) * size;
      const result = await pool.query('SELECT reservations.*, seats.*, showtimes.* FROM reservations JOIN seats ON reservations.seat_id = seats.seat_id JOIN showtimes ON seats.showtime_id = showtimes.showtime_id WHERE seats.showtime_id = $1 ORDER BY reservation_date ASC LIMIT $2 OFFSET $3', [showtimeId, size, offset]); 
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getReservationBySeatId(seatId) {
    try {
      const result = await pool.query('SELECT * FROM reservations WHERE seat_id = $1', [seatId]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new reservationsService();