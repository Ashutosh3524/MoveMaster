import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import EnquiriesComponent from './EnquiriesComponent';
import ReviewsComponent from './ReviewsComponent';
import BlogComponent from './BlogComponent';
import SettingsComponent from './SettingsComponent';


const AdminApp = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // API Base URL - replace with your actual API endpoint
  const API_BASE = 'http://localhost:5000/api';

  const [authToken, setAuthToken] = useState(null);

  // Auth functions
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/admin/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if(response.status == 200){
        alert(`${data.message}`)
        setIsSignedIn(true);
      }
      else if(response.status == 404){
        alert(`${data.message}`)
      }
      else if(response.status == 401){
        alert(`${data.message}`)
      }

    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed due to a network or server error.');
       
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setFormData({ email: '', password: '' });
    setAuthToken(null);
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Sign In</h2>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader2 size={20} className="animate-spin mr-2" /> : null}
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Import and render separate components */}
        <EnquiriesComponent apiBase={API_BASE} authToken={authToken} />
        <ReviewsComponent apiBase={API_BASE} authToken={authToken} />
        <BlogComponent apiBase={API_BASE} authToken={authToken} />
        <SettingsComponent apiBase={API_BASE} authToken={authToken} />
      </div>
    </div>
  );
};

export default AdminApp;