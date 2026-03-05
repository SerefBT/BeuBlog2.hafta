const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { auth } = require('../middleware/auth');
const Post = require('../models/Post');

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ error: 'E-posta zaten kullanımda.' });

        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Hatalı şifre.' });

        const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ user, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Yazarın/Kullanıcının kendini bilgileri
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/me/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/me/password', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { oldPassword, newPassword } = req.body;

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) return res.status(400).json({ error: 'Eski şifre hatalı.' });

        user.password = newPassword;
        await user.save();
        res.json({ message: 'Şifre güncellendi.' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/me/posts', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const posts = await Post.find({ author: user.name }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
