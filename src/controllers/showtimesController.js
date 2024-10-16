const showtimesService = require('../services/showtimesService');

const getShowtimes = async (req, res) => {
  try {
    const result = await showtimesService.getShowtimes();
    res.status(200).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const addShowtime = async (req, res) => {
  const { movieId, showtimeDate } = req.body;

  try {
    const result = await showtimesService.addShowtime(movieId, showtimeDate);
    res.status(201).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

module.exports = {
  getShowtimes,
  addShowtime
};