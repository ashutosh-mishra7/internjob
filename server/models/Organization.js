const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const organizationSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  logo: { type: String, default: '' },
  isApproved: { type: Boolean, default: false }, // Requires admin approval to login/post
  isVerified: { type: Boolean, default: false }, // Adds a verified badge
  isBlocked: { type: Boolean, default: false }
}, { timestamps: true });

organizationSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

organizationSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;
