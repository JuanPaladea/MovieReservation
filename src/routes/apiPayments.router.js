const { getPayments, addPayment, getPaymentById, deletePayment, updatePayment, getPaymentReservations } = require('../controllers/paymentsController');
const adminAuth = require('../middlewares/adminAuth');
const authToken = require('../middlewares/authToken');
const router = require('express').Router();

router.get('/', authToken, getPayments)
router.post('/', authToken, adminAuth, addPayment)
router.get('/:id', authToken, getPaymentById)
router.delete('/:id', authToken, adminAuth, deletePayment)
router.put('/:id', authToken, adminAuth, updatePayment)
router.get('/:id/reservations', authToken, getPaymentReservations)

module.exports = router;