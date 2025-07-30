const Blog = require('../models/blogModel.js');

const createBlog = async (req, res) => {
  try {
    const blogData = req.body;

    const blog = new Blog(blogData);
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    console.error('[SERVER] Error creating blog:', error);
    res.status(500).json({ message: 'Failed to create blog' });
  }
}

const fetchBlog = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
}

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully'});
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({ message: 'Server error during deletion' });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const updatedData = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error('[SERVER] Error fetching published blogs:', error);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
};

const updateBlogStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog status:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = { createBlog , fetchBlog, deleteBlog,updateBlog, getPublishedBlogs, updateBlogStatus}