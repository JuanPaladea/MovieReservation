const reservationsService = require('../services/reservationsService');
const seatsService = require('../services/seatsService');

const getReservations = async (req, res) => {
  try {
    const result = await reservationsService.getReservations();
    res.status(200).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const addReservation = async (req, res) => {
  const userId = req.user.id;
  const { seatIds } = req.body;

  try {
    for (const seatId of seatIds) {
      // check availability
      const isAvailable = await seatsService.checkSeatAvailability(seatId);
      if (!isAvailable) {
        return res.status(400).send({status: 'error', message: `Seat ${seatId} is already reserved`});
      }
    }

    const result = await reservationsService.addReservation(userId, seatIds);
    res.status(201).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const getReservationById = async (req, res) => {
  const reservationId = req.params.reservationId;

  try {
    const result = await reservationsService.getReservationById(reservationId);
    if (!result) {
      return res.status(404).send({status: 'error', message: 'Reservation not found'});
    }

    res.status(200).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const getUserReservations = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await reservationsService.getUserReservations(userId);
    res.status(200).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const getShowtimeReservations = async (req, res) => {
  const showtimeId = req.params.showtimeId;

  try {
    const result = await reservationsService.getShowtimeReservations(showtimeId);
    res.status(200).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const deleteReservation = async (req, res) => {
  const userId = req.user.id;
  const reservationId = req.params.reservationId;

  try {
    const result = await reservationsService.deleteReservation(userId, reservationId);
    res.status(200).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

module.exports = {
  addReservation,
  getReservations,
  getReservationById,
  getUserReservations,
  getShowtimeReservations,
  deleteReservation,
};