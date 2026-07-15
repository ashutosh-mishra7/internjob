const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Organization = require('../models/Organization');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role === 'admin') {
        req.user = await Admin.findById(decoded.userId).select('-password');
      } else if (decoded.role === 'user') {
        req.user = await User.findById(decoded.userId).select('-password');
      } else if (decoded.role === 'organization') {
        req.user = await Organization.findById(decoded.userId).select('-password');
      }
      
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.role = decoded.role;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

const organization = (req, res, next) => {
  if (req.user && req.role === 'organization') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an organization' });
  }
};

module.exports = { protect, admin, organization };
