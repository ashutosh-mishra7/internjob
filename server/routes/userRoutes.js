const express = require('express');
const { updateProfile, getMyListings } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.put('/profile', protect, updateProfile);
router.get('/my-listings', protect, getMyListings);

module.exports = router;
