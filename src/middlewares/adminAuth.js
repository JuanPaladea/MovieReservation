const adminAuth = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({status: 'error', message: 'Forbidden'});
  }
  next();
}

module.exports = adminAuth;