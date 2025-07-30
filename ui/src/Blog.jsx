import { ChevronRight } from 'lucide-react';
import React, { useState, useEffect  } from 'react';
import { motion } from 'framer-motion'
const Blog = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/blogs/published');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);
    return (

        <div className="py-16">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{

                        stiffness: 40,
                        damping: 25,
                        delay: 0.5,
                        duration: 1,

                    }}
                    className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-6">Moving Tips & Insights</h1>
                    <p className="text-xl text-gray-600">Expert advice to make your move easier</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{

                                stiffness: 40,
                                damping: 25,
                                delay: 0.5,
                                duration: 1,

                            }}
                            key={blog._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                                <img src={blog.img} alt={blog.title} className="w-full h-48 object-cover rounded-md" />
                            </div>
                            <div className="p-6">
                                <div className="text-sm text-gray-500 mb-2">{blog.date} • By {blog.author}</div>
                                <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                                <p className="text-gray-600 mb-4">{blog.content}</p>
                                <button className="text-blue-600 font-semibold hover:text-blue-800 flex items-center">
                                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Load More Articles
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Blog
