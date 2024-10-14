const pool = require('../db');

class SessionService {
  async registeUser(username, email, password) {
    try {
      const [result] = await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new SessionService();