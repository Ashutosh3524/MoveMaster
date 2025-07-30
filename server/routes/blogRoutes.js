const express = require('express');
const router = express.Router();
const { createBlog, fetchBlog, deleteBlog,updateBlog, getPublishedBlogs, updateBlogStatus } = require('../controllers/blogController.js');

router.post('/create', createBlog);
router.get('/fetch', fetchBlog);
router.delete('/:id', deleteBlog);
router.put('/update/:id', updateBlog);
router.get('/published', getPublishedBlogs);
router.patch('/update/status/:id', updateBlogStatus);

module.exports = router;