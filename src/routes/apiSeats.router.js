const { getSeatById, getSeatsForShowtime, checkSeatAvailability } = require('../controllers/seatsController');

const adminAuth = require('../middlewares/adminAuth');
const authToken = require('../middlewares/authToken');
const router = require('express').Router();

router.get('/:seatId', getSeatById)
router.get('/showtime/:showtimeId', getSeatsForShowtime)
router.get('/availability/:seatId', checkSeatAvailability)

module.exports = router;