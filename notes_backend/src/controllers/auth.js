const jwt = require('jsonwebtoken');
const config = require('../config');
const {
  registerUser,
  findUserByEmail,
  validatePassword,
} = require('../models/user');

/**
 * PUBLIC_INTERFACE
 * User registration controller
 */
async function register(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  // Check if email already exists
  const found = await findUserByEmail(email);
  if (found) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  const user = await registerUser({ email, password });
  return res.status(201).json({ id: user.id, email: user.email });
}

/**
 * PUBLIC_INTERFACE
 * User login controller (JWT issuance)
 */
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const validPass = await validatePassword(password, user.password_hash);
  if (!validPass) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
  return res.status(200).json({ token, user: { id: user.id, email: user.email } });
}

module.exports = { register, login };
