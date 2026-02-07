const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    slug: {
        type: String,
        unique: true
    },
    content: {
        type: String,
        required: [true, 'Please add some content']
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    tags: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    deletedAt: {
        type: Date,
        default: null
    }
});

// Create post slug from title
postSchema.pre('save', function () {
    if (this.isModified('title')) {
        this.slug = `${slugify(this.title, { lower: true, strict: true })}-${Date.now()}`;
    }
    this.updatedAt = Date.now();
});


// Exclude soft-deleted posts
postSchema.pre(/^find/, function () {
    this.where({ deletedAt: null });
});

module.exports = mongoose.model('Post', postSchema);
