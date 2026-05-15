const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const createAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI not set in server/.env');
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URI);
    
    const email = 'admin@example.com';
    const password = 'adminpassword';
    
    const exists = await User.findOne({ email });
    if (exists) {
      console.log(`Admin user already exists with email: ${email}`);
      process.exit(0);
    }
    
    await User.create({
      name: 'Admin User',
      email,
      password,
      isAdmin: true
    });
    
    console.log(`Admin user created!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err.message);
    process.exit(1);
  }
};

createAdmin();
