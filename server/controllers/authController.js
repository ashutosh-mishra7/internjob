const User = require('../models/User');
const Organization = require('../models/Organization');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register-user
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, username, password, avatar } = req.body;

  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    return res.status(400).json({ message: 'User with email or username already exists' });
  }

  const user = await User.create({ name, email, username, password, avatar });

  if (user) {
    generateToken(res, user._id, user.role);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      avatar: user.avatar
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Register a new organization
// @route   POST /api/auth/register-org
// @access  Public
const registerOrg = async (req, res) => {
  const { companyName, email, username, password } = req.body;

  const orgExists = await Organization.findOne({ $or: [{ email }, { username }] });
  if (orgExists) {
    return res.status(400).json({ message: 'Organization with email or username already exists' });
  }

  const org = await Organization.create({ companyName, email, username, password });

  if (org) {
    res.status(201).json({ message: 'Your request has been submitted. It will be reviewed within 24 hours.' });
  } else {
    res.status(400).json({ message: 'Invalid organization data' });
  }
};

// @desc    Login user/org
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  let role = null;
  let user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
  role = user ? user.role : null;

  if (!user) {
    user = await Organization.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
    if (user) {
      role = 'organization';
      if (!user.isApproved) {
        return res.status(401).json({ message: 'Organization is pending admin approval' });
      }
    }
  }

  if (user && (await user.matchPassword(password))) {
    if (user.isBlocked) {
      return res.status(403).json({ message: 'Your account has been blocked by an administrator.' });
    }
    
    generateToken(res, user._id, role);
    let responseData = {
      _id: user._id,
      email: user.email,
      username: user.username,
      role: role
    };

    if (role === 'organization') {
      responseData.companyName = user.companyName;
      responseData.logo = user.logo;
      responseData.isVerified = user.isVerified;
      responseData.isApproved = user.isApproved;
    } else {
      responseData.name = user.name;
      responseData.avatar = user.avatar;
    }

    res.json(responseData);
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// @desc    Admin login
// @route   POST /api/auth/admin-login
// @access  Public
const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const Admin = require('../models/Admin');
  
  const user = await Admin.findOne({ username });
  if (user && await user.matchPassword(password)) {
      generateToken(res, user._id, 'admin');
      return res.json({
          _id: user._id,
          username: user.username,
          role: 'admin',
          name: user.username,
          isSuperAdmin: user.isSuperAdmin
      });
  } else {
      return res.status(401).json({ message: 'Invalid admin credentials' });
  }
};



// @desc    Logout
// @route   POST /api/auth/logout
// @access  Public
const logout = (req, res) => {
  const isProd = process.env.NODE_ENV === 'production' || (process.env.FRONTEND_URL && !process.env.FRONTEND_URL.includes('localhost'));
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get current session profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  res.json({ ...req.user._doc, role: req.role });
};

module.exports = { registerUser, registerOrg, login, adminLogin, logout, getProfile };
