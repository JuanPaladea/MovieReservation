const { registerUser, loginUser, deleteUser, getUser, logOut } = require('../controllers/sessionController');
const adminAuth = require('../middlewares/adminAuth');
const authToken = require('../middlewares/authToken');
const router = require('express').Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authToken, logOut);
router.get('/user', authToken, getUser);
router.delete('/:userId', authToken, adminAuth, deleteUser);

module.exports = router;