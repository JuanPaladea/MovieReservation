const { getShowtimes, addShowtime, getMovieShowtimes, getUpcomingMovieShowtimes, deleteShowtime } = require('../controllers/showtimesController');
const adminAuth = require('../middlewares/adminAuth');
const authToken = require('../middlewares/authToken');

const router = require('express').Router();

router.get('/', authToken, getShowtimes);
router.get('/:movieId', authToken, getMovieShowtimes);
router.get('/upcoming/:movieId', authToken, getUpcomingMovieShowtimes);
router.post('/add', authToken, adminAuth, addShowtime);
router.delete('/delete/:showtimeId', authToken, adminAuth, deleteShowtime);

module.exports = router;