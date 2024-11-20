const { addReservation, getReservations, getReservationById, getUserReservations, getShowtimeReservations, checkSeatAvailability, deleteReservation } = require('../controllers/reservationsController');
const authToken = require('../middlewares/authToken');
const admninAuth = require('../middlewares/adminAuth');

const router = require('express').Router();

router.get('/', authToken, getReservations);
router.post('/', authToken, addReservation);
router.get('/:reservationId', authToken, getReservationById);
router.delete('/:reservationId', authToken, admninAuth, deleteReservation);
router.get('/user/:userId', authToken, getUserReservations);
router.get('/showtime/:showtimeId', authToken, getShowtimeReservations);

module.exports = router;