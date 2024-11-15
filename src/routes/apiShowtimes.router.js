const { getShowtimes, addShowtime, getMovieShowtimes, getUpcomingMovieShowtimes, deleteShowtime, getShowtimeById } = require('../controllers/showtimesController');
const adminAuth = require('../middlewares/adminAuth');
const authToken = require('../middlewares/authToken');

const router = require('express').Router();

router.get('/', authToken, getShowtimes);
router.post('/', authToken, adminAuth, addShowtime);
router.get('/:showtimeId', authToken, getShowtimeById);
router.delete('/:showtimeId', authToken, adminAuth, deleteShowtime);
router.get('/movie/:movieId', authToken, getMovieShowtimes);
router.get('/upcoming/:movieId', authToken, getUpcomingMovieShowtimes);

module.exports = router;