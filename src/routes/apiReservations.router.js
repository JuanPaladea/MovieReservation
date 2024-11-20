const { addReservation, getReservations, getReservationById, getUserReservations, getShowtimeReservations, checkSeatAvailability, deleteReservation } = require('../controllers/reservationsController');
const authToken = require('../middlewares/authToken');
const adminAuth = require('../middlewares/adminAuth');

const router = require('express').Router();

router.get('/', authToken, adminAuth, getReservations);
router.post('/', authToken, addReservation);
router.get('/:reservationId', authToken, getReservationById);
router.delete('/:reservationId', authToken, adminAuth, deleteReservation);
router.get('/user/:userId', authToken, getUserReservations);
router.get('/showtime/:showtimeId', authToken, getShowtimeReservations);

module.exports = router;