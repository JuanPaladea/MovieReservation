const { getPayments, addPayment, getPaymentById, updatePayment, deletePayment, getPaymentReservations } = require('../controllers/paymentsController');
const adminAuth = require('../middlewares/adminAuth');
const authToken = require('../middlewares/authToken');
const router = require('express').Router();

router.get('/', authToken, adminAuth, getPayments)
router.post('/', authToken, addPayment)
router.get('/:id', authToken, adminAuth, getPaymentById)
router.delete('/:id', authToken, adminAuth, deletePayment)
router.get('/:id/reservations', authToken, getPaymentReservations)

module.exports = router;