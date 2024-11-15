const { addReservation, getReservations, getReservationById, getUserReservations, getShowtimeReservations, checkSeatAvailability, updateReservationStatus, deleteReservation, countShowtimeReservations } = require('../controllers/reservationsController');
const authToken = require('../middlewares/authToken');

const router = require('express').Router();

router.post('/:showtimeId', authToken, addReservation);
router.get('/', authToken, getReservations);
router.get('/:id', authToken, getReservationById);
router.get('/user/:id', authToken, getUserReservations);
router.get('/showtime/:id', authToken, getShowtimeReservations);
router.get('/check-availability/:id', authToken, checkSeatAvailability);
router.put('/:id', authToken, updateReservationStatus);
router.delete('/:id', authToken, deleteReservation);
router.get('/count/:id', authToken, countShowtimeReservations);

module.exports = router;