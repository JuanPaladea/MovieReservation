const pool = require('../db')

// DO $$
// DECLARE
//   movie_id integer; -- Declare movie_id variable
//   movie_ids integer[] := ARRAY[1, 2, 3]; -- Define the 3 movie IDs for the batch
//   show_time1 time := '14:00:00'; -- First show time
//   show_time2 time := '18:00:00'; -- Second show time
//   show_date date := '2024-11-25'; -- Set the show date to 25-11-2024
//   screen_number integer; -- Variable for screen number
//   available_seats integer := 20; -- Default number of available seats, adjust as necessary
//   i integer;
// BEGIN
//   -- Loop through the 3 movie IDs
//   FOR i IN 1..3 LOOP
//     -- Get the movie_id from the array for the current loop
//     movie_id := movie_ids[i];

//     -- Set the screen number for each movie: starting from 1 and incrementing by 1
//     screen_number := i; 

//     -- Insert the first showtime for the movie
//     INSERT INTO showtimes (movie_id, show_date, show_time, screen_number, available_seats, created_at)
//     VALUES (movie_id, show_date, show_time1, screen_number, available_seats, CURRENT_TIMESTAMP);

//     -- Insert the second showtime for the movie
//     INSERT INTO showtimes (movie_id, show_date, show_time, screen_number, available_seats, created_at)
//     VALUES (movie_id, show_date, show_time2, screen_number, available_seats, CURRENT_TIMESTAMP);
//   END LOOP;
// END $$;


class reservationsService {
  async addReservation(userId, showtimeId, seatNumbers) {
    try {
      // Construct the values string for the INSERT query
      const values = seatNumbers.map((seatNumber, index) => `($1, $2, $${index + 3})`).join(', ');
      const query = `INSERT INTO reservations (user_id, showtime_id, seat_number) VALUES ${values} RETURNING *`;
      const params = [userId, showtimeId, ...seatNumbers];

      // Insert the reservations
      const reservationResult = await pool.query(query, params);

      // Update the available seats in the showtimes table
      const seatTotal = seatNumbers.length;
      const updateSeatsQuery = 'UPDATE showtimes SET available_seats = available_seats - $1 WHERE showtime_id = $2 RETURNING *';
      const updateSeatsResult = await pool.query(updateSeatsQuery, [seatTotal, showtimeId]);

      // Return the inserted reservations and updated showtime
      return {
        reservations: reservationResult.rows,
        updatedShowtime: updateSeatsResult.rows[0]
      };
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
      const result = await pool.query('UPDATE reservations SET status = $1 WHERE reservation_id = $2 RETURNING *', [status, reservationId]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteReservation(reservationId) {
    try {
      const result = await pool.query('DELETE FROM reservations WHERE reservation_id = $1 RETURNING *', [reservationId]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async countShowtimeReservations(showtimeId) {
    try {
      const result = await pool.query('SELECT COUNT(*) FROM reservations WHERE showtime_id = $1 AND status = "reserved"', [showtimeId]);
      return parseInt(result.rows[0].count);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
}

module.exports = new reservationsService();