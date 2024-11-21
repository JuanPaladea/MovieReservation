const { registerUser, loginUser, deleteUser } = require('../controllers/sessionController');
const adminAuth = require('../middlewares/adminAuth');
const authToken = require('../middlewares/authToken');
const router = require('express').Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/:userId', authToken, adminAuth, deleteUser);

module.exports = router;