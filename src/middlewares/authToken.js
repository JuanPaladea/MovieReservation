const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
  const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').split(' ')[1]);

  if (!token) {
    return res.status(401).send({status: 'error', message: 'Access denied. No token provided'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).send({status: 'error', message: 'Invalid token'});
  }
}

module.exports = authToken;