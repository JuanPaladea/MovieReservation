const { registerUser } = require('../controllers/sessionController');
const router = require('express').Router();

router.post('/register', registerUser);

module.exports = router;