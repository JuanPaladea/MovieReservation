const pool = require('../db');

class SessionService {
  async registeUser(username, email, password) {
    try {
      const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [userId]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new SessionService();