const express = require('express');
const {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

const router = express.Router();

// Public routes (or optionally auth)
// We need to handle the optional auth in the controller for getAllPosts if we want to show drafts
// But standard express middleware approach is:
// router.use(protect) -> protects everything below
// Since we have mixed access, we apply protect specifically

router.route('/')
    .get((req, res, next) => {
        // Optional auth hack: try to decode token if present, but don't fail if not
        // However, for this requirement: "Authenticated users may filter by status, but should only see their own drafts"
        // It's cleaner to just let the controller handle it if req.user is set.
        // But we need middleware to set req.user if token exists.

        if (req.headers.authorization) {
            return protect(req, res, next);
        }
        next();
    }, getAllPosts)
    .post(protect, validate(schemas.createPost), createPost);

router.route('/:slug')
    .get(getPost);

router.route('/:id')
    .put(protect, validate(schemas.updatePost), updatePost)
    .delete(protect, deletePost);

module.exports = router;
