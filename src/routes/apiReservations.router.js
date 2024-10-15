const { addReservation } = require('../controllers/reservationsController');

const router = require('express').Router();

router.post('/', addReservation);

module.exports = router;