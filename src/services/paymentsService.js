const pool = require('../db');

class PaymentsService {
  async addPayment(userId, amount, paymentMethod, paymentStatus, transactionId, reservationIds) {
    try {
      const reservations = await pool.query('SELECT * FROM reservations WHERE user_id = $1 AND reservation_id = ANY($2)', [userId, reservationIds]);
      reservations.rows.map((reservation) => {
        if (reservation.user_id !== userId) {
          throw new Error('Unauthorized, reservation does not belong to user');
        }
      });

      const paymentResult = await pool.query('INSERT INTO payments (amount, payment_method, payment_status, transaction_id) VALUES ($1, $2, $3, $4) RETURNING *', [amount, paymentMethod, paymentStatus, transactionId]);

      const paymentId = paymentResult.rows[0].payment_id;

      const paymentReservationPromises =  reservationIds.map(async (reservationId) => {
        return await pool.query('INSERT INTO payments_reservations (payment_id, reservation_id) VALUES ($1, $2) RETURNING *', [paymentId, reservationId]);
      });

      const updateReservationsStatusPromises = reservationIds.map(async (reservationId) => {
        return await pool.query('UPDATE reservations SET status = $1 WHERE reservation_id = $2 RETURNING *', [paymentStatus, reservationId]);
      });

      // Find seat_id in reservations table; update seat status in seats table
      const updateSeatsStatusPromises = reservationIds.map(async (reservationId) => {
        const seatId = await pool.query('SELECT seat_id FROM reservations WHERE reservation_id = $1', [reservationId]);
        return await pool.query('UPDATE seats SET status = $1 WHERE seat_id = $2 RETURNING *', [paymentStatus, seatId.rows[0].seat_id]);
      });

      await Promise.all(paymentReservationPromises);
      await Promise.all(updateReservationsStatusPromises);
      await Promise.all(updateSeatsStatusPromises);

      return paymentResult.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getPayments(page, size) {
    try {
      const offset = (page - 1) * size;
      const payments = await pool.query('SELECT * FROM payments ORDER BY payment_id DESC LIMIT $1 OFFSET $2', [size, offset]);
      return payments.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getPaymentById(id) {
    try {
      const result = await pool.query('SELECT * FROM payments WHERE payment_id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletePayment(id) {
    try {
      const result = await pool.query('UPDATE payments SET payment_status = $1 WHERE payment_id = $2 RETURNING *', ['cancelled', id]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getPaymentAndReservations(paymentId) {
    try {
      const result = await pool.query("SELECT payments.*, reservations.* FROM payments JOIN payments_reservations ON payments.payment_id = payments_reservations.payment_id JOIN reservations ON payments_reservations.reservation_id = reservations.reservation_id WHERE payments.payment_id = $1", [paymentId]);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new PaymentsService();