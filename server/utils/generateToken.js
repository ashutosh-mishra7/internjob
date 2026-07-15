const jwt = require('jsonwebtoken');

const generateToken = (res, userId, role) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  const isProd = process.env.NODE_ENV === 'production' || (process.env.FRONTEND_URL && !process.env.FRONTEND_URL.includes('localhost'));
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = generateToken;
