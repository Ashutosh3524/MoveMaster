import React, { useState, useEffect } from 'react';
import { FileText, Loader2, Plus, Edit, Eye, Calendar, User } from 'lucide-react';
import { toast } from 'react-toastify';

const BlogComponent = ({ apiBase, authToken }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    tags: '',
    status: 'draft',
    featuredImage: ''
  });

  const fetchWithAuth = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    
    return fetch(url, { ...options, headers });
  };

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBase}/blogs/fetch`);
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error loading blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      author: '',
      tags: '',
      status: 'draft',
      featuredImage: ''
    });
    setEditingBlog(null);
    setShowCreateForm(false);
  };

  const handleCreateBlog = async () => {
    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        date: new Date().toISOString().split('T')[0],
        views: 0,
        img: formData.featuredImage
      };

      const response = await fetchWithAuth(`${apiBase}/blogs/create`, {
        method: 'POST',
        body: JSON.stringify(blogData)
      });

      if (response.ok) {
        const newBlog = await response.json();
        setBlogs([newBlog, ...blogs]);
        resetForm();
        toast.success('Blog created successfully!');
      } else {
        toast.error('Failed to create blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
     
      const newBlog = {
        id: Date.now(),
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        date: new Date().toISOString().split('T')[0],
        views: 0
      };
      setBlogs([newBlog, ...blogs]);
      resetForm();
      
    }
  };

  const handleUpdateBlog = async () => {
    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        img: formData.featuredImage
      };

      const response = await fetchWithAuth(`${apiBase}/blogs/update/${editingBlog._id}`, {
        method: 'PUT',
        body: JSON.stringify(blogData)
      });

      if (response.ok) {
        setBlogs(blogs.map(blog => 
          blog._id === editingBlog._id ? { ...blog, ...blogData } : blog
        ));
        resetForm();
        toast.success('Blog updated successfully!');
      } else {
        toast.error('Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);     
      setBlogs(blogs.map(blog => 
        blog.id === editingBlog.id ? { ...blog, ...formData, tags: formData.tags.split(',').map(tag => tag.trim()) } : blog
      ));
      resetForm();
      
    }
  };

  const deleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetchWithAuth(`${apiBase}/blogs/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setBlogs(blogs.filter(blog => blog._id !== id));
      } else {
        toast.error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);     
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  const startEditing = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      author: blog.author,
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags,
      status: blog.status,
      featuredImage: blog.featuredImage || ''
    });
    setShowCreateForm(true);
  };

  const updateBlogStatus = async (id, status) => {
    try {
      const response = await fetchWithAuth(`${apiBase}/blogs/update/status/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        setBlogs(blogs.map(blog => 
          blog._id === id ? { ...blog, status } : blog
        ));
      }
    } catch (error) {
      console.error('Error updating blog status:', error);
      setBlogs(blogs.map(blog => 
        blog._id === id ? { ...blog, status } : blog
      ));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FileText size={24} className="mr-3 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-800">Blog Management</h2>
          {loading && <Loader2 size={16} className="animate-spin ml-3 text-purple-600" />}
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadBlogs}
            disabled={loading}
            className="text-blue-600 cursor-none hover:text-blue-800 text-sm disabled:opacity-50"
          >
            Refresh
          </button>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-purple-600 cursor-none text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200 flex items-center"
          >
            <Plus size={16} className="mr-2" />
            New Blog
          </button>
        </div>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingBlog ? 'Edit Blog' : 'Create New Blog'}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block cursor-none text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleFormChange('title', e.target.value)}
                className="w-full cursor-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Blog title"
              />
            </div>
            
            <div>
              <label className="block cursor-none text-sm font-medium text-gray-700 mb-1">
                Author *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleFormChange('author', e.target.value)}
                className="w-full cursor-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Author name"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block cursor-none text-sm font-medium text-gray-700 mb-1">
              Excerpt *
            </label>
            <textarea
              rows={2}
              value={formData.excerpt}
              onChange={(e) => handleFormChange('excerpt', e.target.value)}
              className="w-full cursor-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Brief description of the blog post"
            />
          </div>

          <div className="mb-4">
            <label className="block cursor-none text-sm font-medium text-gray-700 mb-1">
              Content *
            </label>
            <textarea
              rows={8}
              value={formData.content}
              onChange={(e) => handleFormChange('content', e.target.value)}
              className="w-full cursor-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Write your blog content here..."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block cursor-none text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleFormChange('tags', e.target.value)}
                className="w-full cursor-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="react, javascript, web"
              />
            </div>
            
            <div>
              <label className="block cursor-none text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleFormChange('status', e.target.value)}
                className="w-full  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            
            <div>
              <label className="block cursor-none text-sm font-medium text-gray-700 mb-1">
                Featured Image URL
              </label>
              <input
                type="url"
                value={formData.featuredImage}
                onChange={(e) => handleFormChange('featuredImage', e.target.value)}
                className="w-full cursor-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={editingBlog ? handleUpdateBlog : handleCreateBlog}
              className="bg-purple-600 cursor-none text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-200"
            >
              {editingBlog ? 'Update Blog' : 'Create Blog'}
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-500 cursor-none text-white px-6 py-2 rounded-md hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Blog List */}
      <div className="bg-white rounded-lg shadow">
        {blogs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {loading ? 'Loading blogs...' : 'No blogs found'}
          </div>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="p-6 border-b last:border-b-0">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-800 mr-3">{blog.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(blog.status)}`}>
                      {blog.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{blog.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <User size={14} className="mr-1" />
                      {blog.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {blog.date}
                    </span>
                    <span className="flex items-center">
                      <Eye size={14} className="mr-1" />
                      {blog.views} views
                    </span>
                  </div>
                  {blog.tags && (
                    <div className="mt-2">
                      {(Array.isArray(blog.tags) ? blog.tags : [blog.tags]).map((tag, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded mr-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  {blog.status === 'draft' && (
                    <button
                      onClick={() => updateBlogStatus(blog._id, 'published')}
                      className="text-green-600 cursor-none hover:text-green-800 text-sm"
                    >
                      Publish
                    </button>
                  )}
                  {blog.status === 'published' && (
                    <button
                      onClick={() => updateBlogStatus(blog._id, 'draft')}
                      className="text-yellow-600 cursor-none hover:text-yellow-800 text-sm"
                    >
                      Unpublish
                    </button>
                  )}
                  <button
                    onClick={() => startEditing(blog)}
                    className="text-blue-600 cursor-none hover:text-blue-800 text-sm flex items-center"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="text-red-600 cursor-none hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogComponent;