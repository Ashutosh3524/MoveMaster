import React, { useState, useEffect } from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const EnquiriesComponent = ({ apiBase, authToken }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

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

  
  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBase}/contact/fetch`);
      const result = await response.json();
      const data = result.data;

      const formatted = data
        .map((entry) => ({
          id: entry._id, 
          name: entry.name,
          email: entry.email,
          message: entry.message,
          phone: entry.phone,
          subject: entry.subject,
          status: entry.status,
          timestamp: entry.timestamp,
          date: new Date(entry.timestamp).toLocaleDateString('en-GB'),
        }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setEnquiries(formatted);
    } catch (error) {
      console.error('Error loading enquiries:', error);
      setEnquiries([]); 
    } finally {
      setLoading(false);
    }
  };


  const deleteEnquiry = async (id) => {
    try {
      const response = await fetchWithAuth(`${apiBase}/contact/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setEnquiries(enquiries.filter(e => e.id !== id));
      } else {
        toast.error('Failed to delete enquiry');
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
     
      setEnquiries(enquiries.filter(e => e.id !== id));
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await fetchWithAuth(`${apiBase}/contact/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'read' })
      });

      if (response.ok) {
        setEnquiries(enquiries.map(e =>
          e.id === id ? { ...e, status: 'read' } : e
        ));
      }
    } catch (error) {
      console.error('Error marking as read:', error);
      setEnquiries(enquiries.map(e =>
        e.id === id ? { ...e, status: 'read' } : e
      ));
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <MessageSquare size={24} className="mr-3 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Customer Enquiries</h2>
          {loading && <Loader2 size={16} className="animate-spin ml-3 text-blue-600" />}
        </div>
        <button
          onClick={loadEnquiries}
          disabled={loading}
          className="text-blue-600 cursor-none hover:text-blue-800 text-sm disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {enquiries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {loading ? 'Loading enquiries...' : 'No enquiries found'}
          </div>
        ) : (
          enquiries.map((enquiry) => (
            <div key={enquiry.id} className={`p-4 border-b last:border-b-0 ${enquiry.status === 'new' ? 'bg-blue-50' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-800">{enquiry.name}</h3>
                  {enquiry.status === 'new' && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">New</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{enquiry.date}</span>
                  {enquiry.status === 'new' && (
                    <button
                      onClick={() => markAsRead(enquiry.id)}
                      className="text-blue-600 cursor-none hover:text-blue-800 text-sm"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteEnquiry(enquiry.id)}
                    className="text-red-600 cursor-none hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{enquiry.email}</p>
              {enquiry.phone && <p className="text-sm text-gray-600 mb-2">Phone: {enquiry.phone}</p>}
              {enquiry.subject && <p className="text-sm font-medium text-gray-700 mb-2">Subject: {enquiry.subject}</p>}
              <p className="text-gray-700">{enquiry.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EnquiriesComponent;