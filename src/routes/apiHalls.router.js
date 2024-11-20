const { getHalls, getHallById, addHall, updateHall, deleteHall } = require('../controllers/hallsController');

const adminAuth = require('../middlewares/adminAuth');
const authToken = require('../middlewares/authToken');
const router = require('express').Router();

router.get('/', authToken, getHalls)
router.post('/', authToken, adminAuth, addHall)
router.get('/:hallId', authToken, getHallById)
router.put('/:hallId', authToken, adminAuth, updateHall)
router.delete('/:hallId', authToken, adminAuth, deleteHall)

module.exports = router;