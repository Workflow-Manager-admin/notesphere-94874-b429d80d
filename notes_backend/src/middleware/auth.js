const jwt = require('jsonwebtoken');
const config = require('../config');
const { findUserById } = require('../models/user');

/**
 * PUBLIC_INTERFACE
 * Express middleware to verify JWT and attach user to req.user
 */
async function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await findUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = { id: user.id, email: user.email };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { authenticateJWT };
