const moviesService = require('../services/moviesService');

const getMovies = async (req, res) => {
  try {
    const movies = await moviesService.getMovies();
    res.status(200).send({status: 'success', data: movies});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

module.exports = {
  getMovies
};