const reservationsService = require('../services/reservationsService');

const addReservation = async (req, res) => {
  const userId = req.user.id;
  const { seatNumbers, showtimeId } = req.body;

  try {
    for (const seatNumber of seatNumbers) {
      // check availability
      const isAvailable = await reservationsService.checkSeatAvailability(showtimeId, seatNumber);
      if (!isAvailable) {
        return res.status(400).send({status: 'error', message: `Seat ${seatNumber} is already reserved`});
      }
    }

    const result = await reservationsService.addReservation(userId, showtimeId, seatNumbers);
    res.status(201).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const getReservations = async (req, res) => {
  try {
    const result = await reservationsService.getReservations();
    res.status(200).send({status: 'success', data: result});
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
  const userId = req.params.userId;

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

const checkSeatAvailability = async (req, res) => {
  const showtimeId = req.params.showtimeId;
  const seatNumber = req.query.seatNumber;
  console.log(showtimeId, seatNumber)
  try {
    const result = await reservationsService.checkSeatAvailability(showtimeId, seatNumber);
    res.status(200).send({status: 'success', available: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const updateReservationStatus = async (req, res) => {
  const reservationId = req.params.reservationId;
  const { status } = req.body;

  if (!['reserved', 'cancelled'].includes(status)) {
    return res.status(400).send({status: 'error', message: 'Invalid status'});
  }

  try {
    const result = await reservationsService.updateReservationStatus(reservationId, status);
    res.status(200).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const deleteReservation = async (req, res) => {
  const reservationId = req.params.reservationId;

  try {
    const result = await reservationsService.deleteReservation(reservationId);
    res.status(200).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const countShowtimeReservations = async (req, res) => {
  const showtimeId = req.params.showtimeId;

  try {
    const result = await reservationsService.countShowtimeReservations(showtimeId);
    res.status(200).send({status: 'success', Reservations: result});
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
  checkSeatAvailability,
  updateReservationStatus,
  deleteReservation,
  countShowtimeReservations
};