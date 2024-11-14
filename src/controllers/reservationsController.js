const reservationsService = require('../services/reservationsService');

const addReservation = async (req, res) => {
  const userId = req.user.id;
  const { showtimeId, seat_numbers } = req.body;

  try {
    const result = [];
    for (const seat_number of seat_numbers) {
      // check availability
      const isAvailable = await reservationsService.checkSeatAvailability(showtimeId, seat_number);
      if (!isAvailable) {
        return res.status(400).send({status: 'error', message: 'Seat is already reserved'});
      }
    }
    // add reservation
    for (const seat_number of seat_numbers) {
      const reservation = await reservationsService.addReservation(userId, showtimeId, seat_number);
      result.push(reservation);
    }
    res.status(201).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

module.exports = {
  addReservation
};