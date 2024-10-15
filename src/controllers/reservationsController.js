const reservationsService = require('../services/reservationsService');

const addReservation = async (req, res) => {
  const { userId, userName, userEmail, showtimeId, seats, reservationDate } = req.body;

  try {
    const result = await reservationsService.addReservation(userId, userName, userEmail, showtimeId, seats, reservationDate);
    res.status(201).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

module.exports = {
  addReservation
};