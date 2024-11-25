const { getMovies, addMovie, getMovieById, deleteMovie, updateMovie } = require('../controllers/moviesController');
const adminAuth = require('../middlewares/adminAuth');
const authToken = require('../middlewares/authToken');
const router = require('express').Router();

router.get('/', getMovies)
router.post('/', authToken, adminAuth, addMovie)
router.get('/:id', getMovieById)
router.put('/:id', authToken, adminAuth, updateMovie)
router.delete('/:id', authToken, adminAuth, deleteMovie)

module.exports = router;