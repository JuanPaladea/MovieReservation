const hallService = require('../services/hallsService');

const getHalls = async (req, res) => {
  try {
    const halls = await hallService.getHalls();
    res.status(200).send({ status: 'success', data: halls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getHallById = async (req, res) => {
  const { hallId } = req.params;

  try {
    const hall = await hallService.getHallById(hallId);
    res.status(200).json({ status: 'success', data: hall });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const addHall = async (req, res) => {
  const { name, total_rows, seats_per_row } = req.body;

  try {
    const result = await hallService.addHall(name, total_rows, seats_per_row);
    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateHall = async (req, res) => {
  const { hallId } = req.params;
  const { name, total_rows, seats_per_row } = req.body;

  try {
    const result = await hallService.updateHall(hallId, name, total_rows, seats_per_row);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteHall = async (req, res) => {
  const { hallId } = req.params;

  try {
    const result = await hallService.deleteHall(hallId);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getHalls,
  getHallById,
  addHall,
  updateHall,
  deleteHall
};