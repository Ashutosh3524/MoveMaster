import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        fromLocation: '',
        toLocation: '',
        movingDate: '',
        message: ''
    });
    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert('Enquiry submitted successfully! We will contact you soon.');
        setFormData({
            name: '',
            email: '',
            phone: '',
            fromLocation: '',
            toLocation: '',
            movingDate: '',
            message: ''
        });
    };
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
                    <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                    <p className="text-xl text-gray-600">Get in touch for a free moving quote</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{

                            stiffness: 40,
                            damping: 25,
                            delay: 0.5,
                            duration: 1,

                        }}
                        className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Get Free Quote</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Moving From"
                                    value={formData.fromLocation}
                                    onChange={(e) => setFormData({ ...formData, fromLocation: e.target.value })}
                                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Moving To"
                                    value={formData.toLocation}
                                    onChange={(e) => setFormData({ ...formData, toLocation: e.target.value })}
                                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <input
                                type="date"
                                value={formData.movingDate}
                                onChange={(e) => setFormData({ ...formData, movingDate: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <textarea
                                placeholder="Additional Requirements"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                            >
                                Submit Enquiry
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{

                            stiffness: 40,
                            damping: 25,
                            delay: 0.5,
                            duration: 1,

                        }}
                        className="space-y-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <Phone className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <div className="font-semibold">Phone</div>
                                        <div className="text-gray-600">+1 (555) 123-4567</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Mail className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <div className="font-semibold">Email</div>
                                        <div className="text-gray-600">info@movemaster.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <div className="font-semibold">Address</div>
                                        <div className="text-gray-600">123 Moving Street, City, State 12345</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-8 rounded-lg">
                            <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Free, no-obligation quotes</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Licensed and insured</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>24/7 customer support</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Satisfaction guarantee</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );


}

export default Contact
