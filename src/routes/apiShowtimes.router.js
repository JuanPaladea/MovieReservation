const { getShowtimes, addShowtime, getMovieShowtimes, getUpcomingMovieShowtimes, deleteShowtime, getShowtimeById } = require('../controllers/showtimesController');
const adminAuth = require('../middlewares/adminAuth');
const authToken = require('../middlewares/authToken');

const router = require('express').Router();

router.get('/', authToken, getShowtimes);
router.get('/:showtimeId', authToken, getShowtimeById);
router.get('/movie/:movieId', authToken, getMovieShowtimes);
router.get('/upcoming/:movieId', authToken, getUpcomingMovieShowtimes);
router.post('/', authToken, adminAuth, addShowtime);
router.delete('/delete/:showtimeId', authToken, adminAuth, deleteShowtime);

module.exports = router;