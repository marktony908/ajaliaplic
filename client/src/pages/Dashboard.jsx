import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import IncidentList from '../components/IncidentList';
import CreateIncidentModal from '../components/CreateIncidentModal';
import { getAllIncidents } from '../services/incidentService';
import { AlertTriangle, Plus } from 'lucide-react';

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchIncidents = async () => {
    try {
      setIsLoading(true);
      const data = await getAllIncidents();
      // Sort incidents by creation date, newest first
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
    fetchIncidents();
    // Poll for new incidents every 15 seconds
    const interval = setInterval(fetchIncidents, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleIncidentCreated = (newIncident) => {
    setIncidents(prevIncidents => [newIncident, ...prevIncidents]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="text-white w-8 h-8" />
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              </div>
              <p className="text-red-100">View and report incidents in real-time</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-6 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-red-50 transition-all transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Report Incident
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <IncidentList incidents={incidents} onIncidentUpdated={fetchIncidents} />
        )}

        <CreateIncidentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onIncidentCreated={handleIncidentCreated}
        />
      </div>
    </div>
  );
};

export default Dashboard;