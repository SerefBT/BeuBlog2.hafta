const router = require('express').Router();
const Category = require('../models/Category');
const { auth, adminOnly } = require('../middleware/auth');
const slugify = require('slugify');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.json(categories);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/', auth, adminOnly, async (req, res) => {
    try {
        let slug = slugify(req.body.name, { lower: true, strict: true, locale: 'tr' });
        const category = new Category({ name: req.body.name, slug, color: req.body.color });
        await category.save();
        res.json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
