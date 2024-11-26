const pool = require('../db')

class hallsService {
  async getHalls(page, size) {
    try {
      const offset = (page - 1) * size;
      const result = await pool.query('SELECT * FROM halls ORDER BY hall_id ASC LIMIT $1 OFFSET $2', [size, offset]);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getHallById(hallId) {
    try {
      const result = await pool.query('SELECT * FROM halls WHERE hall_id = $1', [hallId]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addHall(hallName, hallRows, hallSeatsPerRow) {
    try {
      const result = await pool.query('INSERT INTO halls (name, total_rows, seats_per_row) VALUES ($1, $2, $3) RETURNING *', [hallName, hallRows, hallSeatsPerRow]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateHall(hallId, hallName, hallRows, hallSeatsPerRow) {
    try {
      const result = await pool.query('UPDATE halls SET name = $1, total_rows = $2, seats_per_row = $3 WHERE hall_id = $4 RETURNING *', [hallName, hallRows, hallSeatsPerRow, hallId]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteHall(hallId) {
    try {
      const result = await pool.query('DELETE FROM halls WHERE hall_id = $1 RETURNING *', [hallId]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new hallsService();