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

const getMovieShowtimes = async (req, res) => {
  const { movieId } = req.params;

  try {
    const result = await showtimesService.getMovieShowtimes(movieId);
    res.status(200).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const getUpcomingMovieShowtimes = async (req, res) => {
  const { movieId } = req.params;

  try {
    const result = await showtimesService.getUpcomingMovieShowtimes(movieId);
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
  getMovieShowtimes,
  getUpcomingMovieShowtimes,
  addShowtime,
  deleteShowtime
};