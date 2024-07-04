const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };
  
  module.exports = authenticateToken;