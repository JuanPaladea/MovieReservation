const paymentsService = require('../services/paymentsService');

const getPayments = async (req, res) => {
  try {
    const payments = await paymentsService.getPayments();
    res.status(200).send({status: 'success', data: payments});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const addPayment = async (req, res) => {
  const { amount, paymentMethod, paymentStatus, reservationIds } = req.body;

  try {
    const result = await paymentsService.addPayment(amount, paymentMethod, paymentStatus, reservationIds);
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

const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { amount, paymentMethod, paymentStatus } = req.body;

  try {
    const payment = await paymentsService.updatePayment(id, amount, paymentMethod, paymentStatus);
    res.status(200).send({status: 'success', data: payment});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const getPaymentReservations = async (req, res) => {
  const { id } = req.params;

  try {
    const paymentReservations = await paymentsService.getPaymentReservations(id);
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
  updatePayment,
  getPaymentReservations
};