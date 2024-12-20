const { addReservation, getReservations, getReservationById, getUserReservations, getShowtimeReservations, deleteReservation, getReservationBySeatId } = require('../controllers/reservationsController');
const authToken = require('../middlewares/authToken');
const adminAuth = require('../middlewares/adminAuth');

const router = require('express').Router();

router.get('/', authToken, adminAuth, getReservations);
router.post('/', authToken, addReservation);
router.get('/user', authToken, getUserReservations);
router.get('/:reservationId', authToken, getReservationById);
router.delete('/:reservationId', authToken, deleteReservation);
router.get('/showtime/:showtimeId', authToken, adminAuth, getShowtimeReservations);
router.get('/showtime/seat/:seatId', authToken, getReservationBySeatId)

module.exports = router;