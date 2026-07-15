const User = require('../models/User');
const Organization = require('../models/Organization');
const Listing = require('../models/Listing');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
};

// @desc    Get all organizations
// @route   GET /api/admin/orgs
// @access  Private/Admin
const getOrgs = async (req, res) => {
  const orgs = await Organization.find({}).select('-password');
  res.json(orgs);
};

// @desc    Approve an organization
// @route   PUT /api/admin/orgs/:id/approve
// @access  Private/Admin
const approveOrg = async (req, res) => {
  const org = await Organization.findById(req.params.id);
  if (org) {
    org.isApproved = !org.isApproved; // toggle
    const updatedOrg = await org.save();
    res.json(updatedOrg);
  } else {
    res.status(404).json({ message: 'Organization not found' });
  }
};

// @desc    Verify an organization badge
// @route   PUT /api/admin/orgs/:id/verify
// @access  Private/Admin
const verifyOrg = async (req, res) => {
  const org = await Organization.findById(req.params.id);
  if (org) {
    org.isVerified = !org.isVerified; // toggle
    const updatedOrg = await org.save();
    res.json(updatedOrg);
  } else {
    res.status(404).json({ message: 'Organization not found' });
  }
};

const Admin = require('../models/Admin');

// @desc    Get all admins
// @route   GET /api/admin/admins
// @access  Private/SuperAdmin
const getAdmins = async (req, res) => {
  if (!req.user.isSuperAdmin) return res.status(403).json({ message: 'Forbidden' });
  const admins = await Admin.find({});
  res.json(admins);
};

// @desc    Create new sub-admin
// @route   POST /api/admin/admins
// @access  Private/SuperAdmin
const createAdmin = async (req, res) => {
  if (!req.user.isSuperAdmin) return res.status(403).json({ message: 'Forbidden' });
  const { username, password } = req.body;
  const exists = await Admin.findOne({ username });
  if (exists) return res.status(400).json({ message: 'Admin already exists' });
  
  const admin = await Admin.create({ username, password, isSuperAdmin: false });
  res.status(201).json(admin);
};

// @desc    Delete sub-admin
// @route   DELETE /api/admin/admins/:id
// @access  Private/SuperAdmin
const deleteAdmin = async (req, res) => {
  if (!req.user.isSuperAdmin) return res.status(403).json({ message: 'Forbidden' });
  const admin = await Admin.findById(req.params.id);
  if (admin && !admin.isSuperAdmin) {
    await admin.deleteOne();
    res.json({ message: 'Admin deleted' });
  } else {
    res.status(400).json({ message: 'Cannot delete super admin or not found' });
  }
};

// @desc    Delete user or org
// @route   DELETE /api/admin/entity/:type/:id
// @access  Private/SuperAdmin
const deleteEntity = async (req, res) => {
  if (!req.user.isSuperAdmin) return res.status(403).json({ message: 'Only SuperAdmin can delete entities' });

  const { type, id } = req.params;
  if (type === 'user') {
    const user = await User.findById(id);
    if(user) {
        await user.deleteOne();
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
  } else if (type === 'org') {
    const org = await Organization.findById(id);
    if(org) {
        await Listing.deleteMany({ organization: id }); // delete all their listings too
        await org.deleteOne();
        res.json({ message: 'Organization and listings deleted' });
    } else {
        res.status(404).json({ message: 'Organization not found' });
    }
  }
};

// @desc    Toggle Block status of user/org
// @route   PUT /api/admin/entity/:type/:id/block
// @access  Private/SuperAdmin
const toggleBlock = async (req, res) => {
  if (!req.user.isSuperAdmin) return res.status(403).json({ message: 'Only SuperAdmin can block entities' });

  const { type, id } = req.params;
  let entity;
  if (type === 'user') entity = await User.findById(id);
  else if (type === 'org') entity = await Organization.findById(id);

  if (entity) {
    entity.isBlocked = !entity.isBlocked;
    await entity.save();
    res.json({ message: `Entity ${entity.isBlocked ? 'blocked' : 'unblocked'}` });
  } else {
    res.status(404).json({ message: 'Entity not found' });
  }
};

// @desc    Reset password of user/org
// @route   PUT /api/admin/entity/:type/:id/reset-password
// @access  Private/Admin
const resetPassword = async (req, res) => {
  const { type, id } = req.params;
  const { newPassword } = req.body;
  if(!newPassword) return res.status(400).json({ message: 'New password required' });

  let entity;
  if (type === 'user') entity = await User.findById(id);
  else if (type === 'org') entity = await Organization.findById(id);

  if (entity) {
    entity.password = newPassword;
    await entity.save(); // pre-save hook will hash it automatically
    res.json({ message: 'Password reset successfully' });
  } else {
    res.status(404).json({ message: 'Entity not found' });
  }
};

module.exports = { getUsers, getOrgs, approveOrg, verifyOrg, deleteEntity, getAdmins, createAdmin, deleteAdmin, toggleBlock, resetPassword };
