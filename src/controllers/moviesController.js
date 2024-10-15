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

const addMovie = async (req, res) => {
  const { title, description, release_date } = req.body;

  try {
    const result = await moviesService.addMovie(title, description, release_date);
    res.status(201).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

module.exports = {
  getMovies,
  addMovie
};