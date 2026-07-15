const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // No hashing as requested
  isSuperAdmin: { type: Boolean, default: false } // Only super admin can create sub-admins and delete entities
}, { timestamps: true });

// Custom method to compare unstored/unhashed password directly
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return enteredPassword === this.password;
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
