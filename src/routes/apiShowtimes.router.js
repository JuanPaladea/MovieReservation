const { getShowtimes, addShowtime, getMovieShowtimes, getUpcomingMovieShowtimes, deleteShowtime, getShowtimeById } = require('../controllers/showtimesController');
const adminAuth = require('../middlewares/adminAuth');
const authToken = require('../middlewares/authToken');

const router = require('express').Router();

router.get('/', getShowtimes);
router.post('/', authToken, adminAuth, addShowtime);
router.get('/:showtimeId', getShowtimeById);
router.delete('/:showtimeId', authToken, adminAuth, deleteShowtime);
router.get('/movie/:movieId', getMovieShowtimes);
router.get('/upcoming/:movieId', getUpcomingMovieShowtimes);

module.exports = router;