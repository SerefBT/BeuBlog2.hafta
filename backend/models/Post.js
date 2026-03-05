const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    status: { type: String, enum: ['published', 'suspended', 'draft'], default: 'published' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);
