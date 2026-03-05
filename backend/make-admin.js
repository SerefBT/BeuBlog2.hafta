require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blogdb';

const makeAdmin = async () => {
    try {
        await mongoose.connect(URI);
        const email = process.argv[2];

        if (!email) {
            console.log('Lütfen bir e-posta adresi belirtin.');
            process.exit(1);
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log('Kullanıcı bulunamadı.');
            process.exit(1);
        }

        await User.updateOne({ email }, { $set: { role: 'admin' } });
        console.log(`${user.name} başarıyla admin yapıldı. Şifresi korundu.`);
        process.exit(0);

    } catch (err) {
        console.error('Hata:', err);
        process.exit(1);
    }
};

makeAdmin();
