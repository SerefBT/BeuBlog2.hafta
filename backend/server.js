const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blogdb';

mongoose.connect(URI)
    .then(() => console.log('MongoDB connect success'))
    .catch(err => console.error('MongoDB connect error', err));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/posts', require('./routes/posts'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
