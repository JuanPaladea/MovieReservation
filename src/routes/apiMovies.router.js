const { getMovies } = require('../controllers/moviesController');
const router = require('express').Router();

router.get('/', getMovies)

module.exports = router;