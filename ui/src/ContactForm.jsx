import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/settings/fetch');
        const data = await response.json();
        setSettings(data);
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };

    fetchSettings();
  }, []);

  // API Base URL - replace with your actual backend endpoint
  const API_BASE = 'http://localhost:5000/api/contact/create';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.message.trim()) return 'Message is required';
    if (!formData.subject.trim()) return 'Subject is required';
    if (!formData.phone.trim()) return 'Phone Number is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email';

    //phone validation
    if (formData.phone.length != 10) {
      return 'Phone number must be 10 digits';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const error = validateForm();
    if (error) {
      setStatus({ loading: false, success: false, error });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      // Prepare data for backend
      const contactData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim() || 'General Inquiry',
        message: formData.message.trim(),
        timestamp: new Date().toISOString(),
        status: 'new'
      };

      console.log('Sending contact data:', contactData);

      // Send to backend
      const response = await fetch(`${API_BASE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, error: null });
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setStatus({ loading: false, success: false, error: null });
        }, 5000);
      } else {
        setStatus({
          loading: false,
          success: false,
          error: result.message || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus({
        loading: false,
        success: false,
        error: 'Network error. Please check your connection and try again.'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setStatus({ loading: false, success: false, error: null });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{

            stiffness: 40,
            damping: 25,
            delay: 0.5,
            duration: 1,

          }}
          className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or want to work together? We'd love to hear from you.
            Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{

              stiffness: 40,
              damping: 25,
              delay: 0.5,
              duration: 1,

            }}
            className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-900">+91 79829XXXXX</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900">
                      {settings?.contactEmail || 'Loading...'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="text-gray-900">123 Business St, City, State 12345</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-2">Business Hours</p>
                {settings?.businessHours && (
                  <>
                    <p className="text-gray-900 text-sm">Monday-Friday: {settings.businessHours.friday}</p>
                    <p className="text-gray-900 text-sm">Saturday: {settings.businessHours.saturday}</p>
                    <p className="text-gray-900 text-sm">Sunday: {settings.businessHours.sunday}</p>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{

              stiffness: 40,
              damping: 25,
              delay: 0.5,
              duration: 0.8,

            }}
            className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h3>

              {/* Status Messages */}
              {status.success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <p className="text-green-800">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                  <p className="text-red-800">{status.error}</p>
                </div>
              )}

              <div onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block cursor-none text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border cursor-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                      disabled={status.loading}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block cursor-none text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border cursor-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                      disabled={status.loading}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phone" className="block cursor-none text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border cursor-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 83769XXXXX"
                      disabled={status.loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block cursor-none text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border cursor-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="How can we help?"
                      disabled={status.loading}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block cursor-none text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border cursor-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    placeholder="Tell us more about your inquiry..."
                    disabled={status.loading}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.message.length}/500 characters
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSubmit}
                    disabled={status.loading}
                    className="flex-1 bg-blue-600 cursor-none text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center"
                  >
                    {status.loading ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={status.loading}
                    className="px-6 py-2 border cursor-none border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition duration-200"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;