require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blogdb').then(async () => {
    const user = await User.findOne({ email: 'cosar.bayat1@gmail.com' });
    if (user) {
        user.password = '123456';
        await user.save();
        console.log('Password reset to 123456 for:', user.email);
    }
    process.exit(0);
});
