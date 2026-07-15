const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Seed default super admin if none exists
    const superAdminExists = await Admin.findOne({ isSuperAdmin: true });
    if (!superAdminExists) {
      await Admin.create({
        username: 'admin',
        password: 'adminpassword',
        isSuperAdmin: true
      });
      console.log('Default Super Admin seeded: admin / adminpassword');
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
