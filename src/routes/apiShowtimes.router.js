const { getShowTimeId, getShowtimes, addShowtime } = require('../controllers/showtimesController');

const router = require('express').Router();

router.get('/', getShowtimes);
router.post('/id', getShowTimeId);
router.post('/add', addShowtime);

module.exports = router;