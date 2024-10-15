const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sessionService = require('../services/sessionService');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await sessionService.registeUser(username, email, hashedPassword);
    res.status(201).send({status: 'success', data: result});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await sessionService.loginUser(email);
    if (!user) {
      return res.status(404).send({status: 'error', message: 'User not found'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({status: 'error', message: 'Invalid password'});
    }

    const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).send({status: 'success', data: {token}});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

module.exports = {
  registerUser,
  loginUser
};