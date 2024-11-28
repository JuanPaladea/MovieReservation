const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sessionService = require('../services/sessionService');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  //REGEX FOR EMAIL
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).send({status: 'error', message: 'Invalid email'});
  }
  //REGEX FOR PASSWORD
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    return res.status(400).send({status: 'error', message: 'Password must contain at least 8 characters, one letter and one number'});
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

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await sessionService.registeUser(username, email, hashedPassword);
    const token = jwt.sign({id: user.user_id, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.cookie('token', token, {httpOnly: true});
    res.status(201).send({status: 'success', data: {token}});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //REGEX FOR EMAIL
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).send({status: 'error', message: 'Invalid email'});
  }

  try {
    const user = await sessionService.getUserByEmail(email);
    if (!user) {
      return res.status(400).send({status: 'error', message: 'User not found'});
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({status: 'error', message: 'Invalid password'});
    }

    const token = jwt.sign({id: user.user_id, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
    
    res.cookie('token', token, {httpOnly: true});
    res.status(200).send({status: 'success', data: {token}});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await sessionService.deleteUser(userId);
    if (result.rowCount === 0) {
      return res.status(404).send({status: 'error', message: 'User not found'});
    }
    res.status(200).send({status: 'success', message: 'User deleted successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
} 

const getUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await sessionService.getUserById(userId);
    if (!user) {
      return res.status(404).send({status: 'error', message: 'User not found'});
    }
    res.status(200).send({status: 'success', data: {user: {id: user.user_id, username: user.username, email: user.email, role: user.role}}});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 'error', message: error.message});
  }
}

const logOut = (req, res) => {
  res.clearCookie('token');
  res.status(200).send({status: 'success', message: 'User logged out successfully'});
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
  logOut
};