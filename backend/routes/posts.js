const router = require('express').Router();
const Post = require('../models/Post');
const slugify = require('slugify');
const jwt = require('jsonwebtoken');
const { auth, adminOnly } = require('../middleware/auth');

const generateSlug = async (title) => {
    let slug = slugify(title, { lower: true, strict: true, locale: 'tr' });
    if (!slug) slug = 'yazi';

    let existing = await Post.findOne({ slug });
    if (!existing) return slug;

    let counter = 2;
    while (existing) {
        const newSlug = `${slug}-${counter}`;
        existing = await Post.findOne({ slug: newSlug });
        if (!existing) return newSlug;
        counter++;
    }
};

// Tüm postları getir
router.get('/', async (req, res) => {
    try {
        let isAdmin = false;
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded.role === 'admin') isAdmin = true;
            } catch (e) {
                // Gecersiz token olsa da misafir gibi davran
            }
        }

        let filter = { status: { $in: ['published', null, undefined] } };
        if (isAdmin) {
            filter = {}; // Admin tüm postları görebilir (suspended dahil)
        }

        const posts = await Post.find(filter).sort({ createdAt: -1 }).populate('category');
        res.json(posts);
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
});

// Yeni post ekle
router.post('/', auth, async (req, res) => {
    const { title, content, author, category } = req.body;
    try {
        const slug = await generateSlug(title);
        const newPost = new Post({ title, content, author, slug, category });
        await newPost.save();
        res.json(newPost);
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
});

router.get('/by-slug/:slug', async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug }).populate('category');
        if (!post) return res.status(404).json({ error: 'Post bulunamadı' });
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('category');
        if (!post) return res.status(404).json({ error: 'Post bulunamadı' });
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
});

// Post güncelle
router.put('/:id', auth, async (req, res) => {
    try {
        // Admin veya Yazı sahibi
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post bulunamadı' });

        if (req.user.role !== 'admin' && post.author !== req.user.name) {
            return res.status(403).json({ error: 'Bu postu düzenleme yetkiniz yok.' });
        }

        Object.assign(post, req.body);

        if (req.body.title) {
            post.slug = await generateSlug(req.body.title);
        }

        await post.save();
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
});

// Post sil
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post bulunamadı' });

        if (req.user.role !== 'admin' && post.author !== req.user.name) {
            return res.status(403).json({ error: 'Bu postu silme yetkiniz yok.' });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted.' });
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
});

router.put('/:id/like', auth, async (req, res) => {
    // Like logic
    res.json({ message: 'Liked' });
});

router.put('/:id/status', auth, adminOnly, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post bulunamadı' });

        post.status = req.body.status;
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
});

module.exports = router;
