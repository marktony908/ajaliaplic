import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AdminIncidentList from '../components/AdminIncidentList';
import UserManagement from '../components/UserManagement';
import { getAllIncidents } from '../services/incidentService';
import { AlertTriangle, Users, FileText } from 'lucide-react';

const AdminDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [activeTab, setActiveTab] = useState('incidents');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchIncidents = async () => {
    try {
      setIsLoading(true);
      const data = await getAllIncidents();
      const sortedIncidents = data.sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      setIncidents(sortedIncidents);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.is_admin) {
      fetchIncidents();
      // Poll for new incidents every 15 seconds
      const interval = setInterval(fetchIncidents, 15000);
      return () => clearInterval(interval);
    }
  }, [user]);

  if (!user?.is_admin) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="text-white w-8 h-8" />
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <p className="text-red-100">Manage incidents and users</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('incidents')}
              className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                activeTab === 'incidents'
                  ? 'bg-red-100 text-red-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-5 h-5 mr-2" />
              Incident Reports
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                activeTab === 'users'
                  ? 'bg-red-100 text-red-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              User Management
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ) : activeTab === 'incidents' ? (
            <AdminIncidentList incidents={incidents} onIncidentUpdated={fetchIncidents} />
          ) : (
            <UserManagement />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;