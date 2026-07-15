const express = require('express');
const { updateOrgProfile } = require('../controllers/orgController');
const { protect, organization } = require('../middlewares/authMiddleware');

const router = express.Router();

router.put('/profile', protect, organization, updateOrgProfile);

module.exports = router;
