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
  const { title, genre, duration, rating, release_date, description, thumbnails} = req.body;

  try {
    const result = await moviesService.addMovie(title, genre, duration, rating, description, release_date, thumbnails);
    res.status(201).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await moviesService.getMovieById(id);
    res.status(200).send({status: 'success', data: movie});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await moviesService.deleteMovie(id);
    res.status(200).send({status: 'success', data: movie});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  deleteMovie
};