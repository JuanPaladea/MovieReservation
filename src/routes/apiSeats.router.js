const { getSeatById, getSeatsForShowtime, checkSeatAvailability, updateSeatStatus } = require('../controllers/seatsController');

const adminAuth = require('../middlewares/adminAuth');
const authToken = require('../middlewares/authToken');
const router = require('express').Router();

router.get('/:seatId', getSeatById)
router.put('/:seatId', authToken, adminAuth, updateSeatStatus)
router.get('/showtime/:showtimeId', getSeatsForShowtime)
router.get('/availability/:seatId', checkSeatAvailability)

module.exports = router;