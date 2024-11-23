const pool = require('../db');

class PaymentsService {
  async addPayment(amount, paymentMethod, paymentStatus, reservationIds) {
    try {
      const paymentResult = await pool.query('INSERT INTO payments (amount, payment_method, payment_status) VALUES ($1, $2, $3) RETURNING *', [amount, paymentMethod, paymentStatus]);

      const paymentId = paymentResult.rows[0].payment_id;

      const paymentReservationPromises =  reservationIds.map(async (reservationId) => {
        return await pool.query('INSERT INTO payments_reservations (payment_id, reservation_id) VALUES ($1, $2) RETURNING *', [paymentId, reservationId]);
      });

      const updateReservationsStatusPromises = reservationIds.map(async (reservationId) => {
        return await pool.query('UPDATE reservations SET reservation_status = $1 WHERE reservation_id = $2 RETURNING *', [paymentStatus, reservationId]);
      });

      // Find seat_id in reservations table; update seat status in seats table
      const updateSeatsStatusPromises = reservationIds.map(async (reservationId) => {
        const seatId = await pool.query('SELECT seat_id FROM reservations WHERE reservation_id = $1', [reservationId]);
        return await pool.query('UPDATE seats SET seat_status = $1 WHERE seat_id = $2 RETURNING *', [paymentStatus, seatId.rows[0].seat_id]);
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

  async getPayments() {
    try {
      const payments = await pool.query('SELECT * FROM payments');
      return payments.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updatePayment(id, amount, paymentMethod, paymentStatus) {
    try {
      const result = await pool.query('UPDATE payments SET amount = $1, payment_method = $2, payment_status = $3 WHERE payment_id = $4 RETURNING *', [amount, paymentMethod, paymentStatus, id]);
      return result.rows[0];
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