import React, { useState, useEffect } from 'react';
import { Menu, X, Truck, Shield, Clock, Star, Phone, Mail, MapPin, Users, Award, Target, ChevronRight, CheckCircle, Home } from 'lucide-react';
import AppRoutes from './AppRoutes';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'




const App = () => {
  const navigate = useNavigate();
  const MotionLink = motion.create(Link);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const navigation = [
    { id: '/', label: 'Home' },
    { id: '/about', label: 'About Us' },
    { id: '/services', label: 'Services' },
    { id: '/blog', label: 'Blog' },
    { id: '/reviews', label: 'Reviews' },
    { id: '/contact', label: 'Contact' },
     {id: '/admin', label: 'Admin'}
  ];
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {

    const timeout = setTimeout(() => setIsFirstLoad(false), 2000); // or after animation finishes
    return () => clearTimeout(timeout);
  }, []);



  return (

    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 transition-all duratio-300">
        <div className="max-w-6xl mx-5 px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{

                damping: 25,
                delay: 0.3,
                duration: 1.2
              }}
              className="flex items-center space-x-2">
              <Truck className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">MoveMaster</span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item, index) => (
                <MotionLink
                  
                  initial={isFirstLoad ? { opacity: 0, y: -20 } : false}
                  animate={isFirstLoad ? { opacity: 1, y: 0 } : false}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.7 + index * 0.2,
                  }}
                  key={item.id}
                  to={item.id}
                  className={`relative group px-3 py-2 rounded-md text-sm font-medium ${location.pathname === item.id ? 'text-blue-600' : 'text-gray-700'
                    } hover:text-blue-600`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>

                </MotionLink>

              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                {navigation.map((item) => (
                  <Link
                    key={item.id}
                    to={item.id}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <AppRoutes />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Truck className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold">MoveMaster</span>
              </div>
              <p className="text-gray-300">
                Your trusted partner for safe, reliable, and stress-free moving experiences.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button onClick={() => navigate('/home')} className="block text-gray-300 hover:text-white transition-colors">Home</button>
                <button onClick={() => navigate('/about')} className="block text-gray-300 hover:text-white transition-colors">About Us</button>
                <button onClick={() => navigate('/services')} className="block text-gray-300 hover:text-white transition-colors">Services</button>
                <button onClick={() => navigate('/contact')} className="block text-gray-300 hover:text-white transition-colors">Contact</button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <div className="space-y-2 text-gray-300">
                <div>Local Moving</div>
                <div>Interstate Moving</div>
                <div>Office Relocation</div>
                <div>Storage Solutions</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@movemaster.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Moving Street, City</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">&copy; 2025 MoveMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>

  );
};

export default App;
