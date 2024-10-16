const { getMovies, addMovie } = require('../controllers/moviesController');
const adminAuth = require('../middlewares/adminAuth');
const authToken = require('../middlewares/authToken');
const router = require('express').Router();

router.get('/', authToken, getMovies)
router.post('/', authToken, adminAuth, addMovie)

module.exports = router;