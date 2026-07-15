const express = require('express');
const { registerUser, registerOrg, login, adminLogin, logout, getProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register-user', registerUser);
router.post('/register-org', registerOrg);
router.post('/login', login);
router.post('/admin-login', adminLogin);
router.post('/logout', logout);
router.get('/profile', protect, getProfile);

module.exports = router;
