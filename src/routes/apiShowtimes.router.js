const { getShowtimes, addShowtime } = require('../controllers/showtimesController');
const adminAuth = require('../middlewares/adminAuth');
const authToken = require('../middlewares/authToken');

const router = require('express').Router();

router.get('/', authToken, getShowtimes);
router.post('/add', authToken, adminAuth, addShowtime);

module.exports = router;