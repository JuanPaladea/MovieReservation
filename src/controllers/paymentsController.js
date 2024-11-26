const paymentsService = require('../services/paymentsService');

const getPayments = async (req, res) => {
  const { page = 1, size = 10 } = req.query;
  
  try {
    const payments = await paymentsService.getPayments(page, size);
    res.status(200).send({status: 'success', data: payments});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const addPayment = async (req, res) => {
  const userId = req.user.id;
  const { amount, paymentMethod, paymentStatus, transactionId, reservationIds } = req.body;

  try {
    const result = await paymentsService.addPayment(userId, amount, paymentMethod, paymentStatus, transactionId, reservationIds);
    res.status(201).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await paymentsService.getPaymentById(id);
    res.status(200).send({status: 'success', data: payment});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await paymentsService.deletePayment(id);
    res.status(200).send({status: 'success', data: payment});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const getPaymentReservations = async (req, res) => {
  const { id } = req.params;

  try {
    const paymentReservations = await paymentsService.getPaymentAndReservations(id);
    res.status(200).send({status: 'success', data: paymentReservations});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

module.exports = {
  getPayments,
  addPayment,
  getPaymentById,
  deletePayment,
  getPaymentReservations
};