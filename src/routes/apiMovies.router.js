const { getMovies, addMovie, getMovieById, deleteMovie } = require('../controllers/moviesController');
const adminAuth = require('../middlewares/adminAuth');
const authToken = require('../middlewares/authToken');
const router = require('express').Router();

router.get('/', authToken, getMovies)
router.get('/:id', authToken, getMovieById)
router.post('/', authToken, adminAuth, addMovie)
router.delete('/:id', authToken, adminAuth, deleteMovie)

module.exports = router;