const { getMovies, addMovie } = require('../controllers/moviesController');
const adminAuth = require('../middlewares/adminAuth');
const router = require('express').Router();

router.get('/', getMovies)
router.post('/', adminAuth, addMovie)

module.exports = router;