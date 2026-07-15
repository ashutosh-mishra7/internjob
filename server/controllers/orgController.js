const Organization = require('../models/Organization');

// @desc    Update organization profile
// @route   PUT /api/org/profile
// @access  Private/Organization
const updateOrgProfile = async (req, res) => {
  const org = await Organization.findById(req.user._id);

  if (org) {
    org.companyName = req.body.companyName || org.companyName;
    
    // Check if new username is unique
    if (req.body.username && req.body.username !== org.username) {
        const existing = await Organization.findOne({ username: req.body.username });
        if(existing) return res.status(400).json({ message: 'Username already taken' });
        org.username = req.body.username;
    }

    // Password change requires old password verification
    if (req.body.newPassword) {
      if (!req.body.oldPassword) {
        return res.status(400).json({ message: 'Please enter your current password' });
      }
      const isMatch = await org.matchPassword(req.body.oldPassword);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      org.password = req.body.newPassword;
    }

    const updatedOrg = await org.save();

    res.json({
      _id: updatedOrg._id,
      companyName: updatedOrg.companyName,
      email: updatedOrg.email,
      username: updatedOrg.username,
      logo: updatedOrg.logo,
      isVerified: updatedOrg.isVerified,
      isApproved: updatedOrg.isApproved,
      role: 'organization'
    });
  } else {
    res.status(404).json({ message: 'Organization not found' });
  }
};

module.exports = { updateOrgProfile };
