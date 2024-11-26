const showtimesService = require('../services/showtimesService');

const getShowtimes = async (req, res) => {
  const { page = 1, size = 10 } = req.query;

  try {
    const result = await showtimesService.getShowtimes(page, size);
    res.status(200).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const getShowtimeById = async (req, res) => {
  const { showtimeId } = req.params

  try {
    const result = await showtimesService.getShowtimeById(showtimeId);
    res.status(200).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const getMovieShowtimes = async (req, res) => {
  const { movieId } = req.params;
  const { page = 1, size = 10 } = req.query;

  try {
    const result = await showtimesService.getMovieShowtimes(movieId, page, size);
    res.status(200).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const getUpcomingMovieShowtimes = async (req, res) => {
  const { movieId } = req.params;
  const { page = 1, size = 10 } = req.query;

  try {
    const result = await showtimesService.getUpcomingMovieShowtimes(movieId, page, size);
    res.status(200).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const addShowtime = async (req, res) => {
  const { movieId, hallId, showDate, showTime, price} = req.body;
  try {
    const result = await showtimesService.addShowtime(movieId, hallId, showDate, showTime, price);
    res.status(201).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const deleteShowtime = async (req, res) => {
  const { showtimeId } = req.params;

  try {
    const result = await showtimesService.deleteShowtime(showtimeId);
    res.status(200).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

module.exports = {
  getShowtimes,
  getShowtimeById,
  getMovieShowtimes,
  getUpcomingMovieShowtimes,
  addShowtime,
  deleteShowtime
};