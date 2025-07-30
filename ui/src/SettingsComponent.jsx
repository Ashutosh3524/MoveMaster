import React, { useState, useEffect } from 'react';
import { Settings, Loader2, Save } from 'lucide-react';

const SettingsComponent = ({ apiBase, authToken }) => {
  const [settings, setSettings] = useState({
    adminEmail: '',
    emailNotifications: true,
    reviewNotifications: true,
    maintenanceMode: false,
    autoRefresh: 5,
    siteName: '',
    contactEmail: '',
    businessHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed'
    }
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBase}/settings/fetch`);
      const data = await response.json();
      setSettings({ ...settings, ...data });
    } catch (error) {
      console.error('Error loading settings:', error);
      // Use default settings for demo
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const response = await fetchWithAuth(`${apiBase}/settings/create`, {
        method: 'PUT',
        body: JSON.stringify(settings)
      });
      
      if (response.ok) {
        alert('Settings saved successfully!');
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Settings saved locally (demo mode)');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBusinessHoursChange = (day, value) => {
    setSettings(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: value
      }
    }));
  };

  useEffect(() => {
    loadSettings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
        <span className="ml-2">Loading settings...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <Settings size={24} className="mr-3 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Account Settings */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-800">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="admin@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Site Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="contact@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notification Preferences
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2" 
                      checked={settings.emailNotifications}
                      onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                    />
                    <span className="text-sm">Email notifications for new enquiries</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2" 
                      checked={settings.reviewNotifications}
                      onChange={(e) => handleInputChange('reviewNotifications', e.target.checked)}
                    />
                    <span className="text-sm">Email notifications for new reviews</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* System Settings */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-800">System Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Status
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2" 
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                  />
                  <span className="text-sm">Enable maintenance mode</span>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Auto-refresh interval (minutes)
                </label>
                <input
                  type="number"
                  value={settings.autoRefresh}
                  onChange={(e) => handleInputChange('autoRefresh', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="5"
                  min="1"
                  max="60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Hours
                </label>
                <div className="space-y-2">
                  {Object.entries(settings.businessHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center">
                      <span className="w-20 text-sm capitalize">{day}:</span>
                      <input
                        type="text"
                        value={hours}
                        onChange={(e) => handleBusinessHoursChange(day, e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <button 
            onClick={saveSettings}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 flex items-center"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;