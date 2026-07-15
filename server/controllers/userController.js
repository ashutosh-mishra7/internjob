const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private/User
const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.avatar = req.body.avatar || user.avatar;
    
    // Check if new username is unique
    if (req.body.username && req.body.username !== user.username) {
        const existing = await User.findOne({ username: req.body.username });
        if(existing) return res.status(400).json({ message: 'Username already taken' });
        user.username = req.body.username;
    }

    // Password change requires old password verification
    if (req.body.newPassword) {
      if (!req.body.oldPassword) {
        return res.status(400).json({ message: 'Please enter your current password' });
      }
      const isMatch = await user.matchPassword(req.body.oldPassword);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      user.password = req.body.newPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      username: updatedUser.username,
      avatar: updatedUser.avatar,
      role: 'user'
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Get user's saved & applied listings
// @route   GET /api/users/my-listings
// @access  Private/User
const getMyListings = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('savedListings')
    .populate('appliedListings');
  
  if (user) {
    res.json({
      savedListings: user.savedListings,
      appliedListings: user.appliedListings
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { updateProfile, getMyListings };
