const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sessionService = require('../services/sessionService');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  //REGEX FOR EMAIL
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).send({status: 'error', message: 'Invalid email'});
  }

  try {
    const user = await sessionService.getUserByEmail(email);
    if (user) {
      return res.status(400).send({status: 'error', message: 'User already exists'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }

  //REGEX FOR PASSWORD
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    return res.status(400).send({status: 'error', message: 'Password must contain at least 8 characters, one letter and one number'});
  }

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
    const user = await sessionService.getUserByEmail(email);
    if (!user) {
      return res.status(404).send({status: 'error', message: 'User not found'});
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({status: 'error', message: 'Invalid password'});
    }

    const token = jwt.sign({id: user.user_id, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
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