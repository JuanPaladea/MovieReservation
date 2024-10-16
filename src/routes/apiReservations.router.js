const { addReservation } = require('../controllers/reservationsController');
const authToken = require('../middlewares/authToken');

const router = require('express').Router();

router.post('/', authToken, addReservation);

module.exports = router;