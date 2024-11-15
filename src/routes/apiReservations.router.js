const { addReservation, getReservations, getReservationById, getUserReservations, getShowtimeReservations, checkSeatAvailability, updateReservationStatus, deleteReservation, countShowtimeReservations } = require('../controllers/reservationsController');
const authToken = require('../middlewares/authToken');

const router = require('express').Router();

router.get('/', authToken, getReservations);
router.post('/', authToken, addReservation);
router.get('/:reservationId', authToken, getReservationById);
router.put('/:reservationId', authToken, updateReservationStatus);
router.delete('/reservationId', authToken, deleteReservation);
router.get('/user/:userId', authToken, getUserReservations);
router.get('/showtime/:showtimeId', authToken, getShowtimeReservations);
router.get('/check-availability/:showtimeId', authToken, checkSeatAvailability);
router.get('/count/:showtimeId', authToken, countShowtimeReservations);

module.exports = router;