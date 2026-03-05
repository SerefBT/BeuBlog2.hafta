require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blogdb').then(async () => {
    const user = await User.findOne({ email: 'cosar.bayat1@gmail.com' });
    console.log('User found:', user.email);
    console.log('Role:', user.role);
    console.log('Password hash starts with:', user.password.substring(0, 10));

    // compare test
    const bcrypt = require('bcryptjs');
    // We don't know the password, but we can see if it's double hashed.
    // bcrypt hashes start with $2a$ or $2b$
    console.log('Is valid bcrypt hash format:', user.password.startsWith('$2'));

    process.exit(0);
});
