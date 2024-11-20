const seatsService = require('../services/seatsService');

const getSeatById = async (req, res) => {
  const { seatId } = req.params;

  try {
    const seat = await seatsService.getSeatById(seatId);
    res.status(200).json({ status: 'success', data: seat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getSeatsForShowtime = async (req, res) => {
  const { showtimeId } = req.params;

  try {
    const seats = await seatsService.getSeatsForShowtime(showtimeId);
    res.status(200).json({ status: 'success', data: seats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const checkSeatAvailability = async (req, res) => {
  const { seatId } = req.params;

  try {
    const isAvailable = await seatsService.checkSeatAvailability(seatId);
    res.status(200).json({ status: 'success', data: isAvailable });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateSeatStatus = async (req, res) => {
  const { seatId } = req.params;
  const { status } = req.body;

  try {
    const result = await seatsService.updateSeatStatus(seatId, status);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getSeatById,
  getSeatsForShowtime,
  checkSeatAvailability,
  updateSeatStatus
};