import { useState } from 'react';
import { deleteIncident } from '../services/incidentService';
import { MapPin, Trash2, AlertTriangle, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import ConfirmDialog from './ConfirmDialog';

const AdminIncidentList = ({ incidents, onIncidentUpdated }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [expandedIncident, setExpandedIncident] = useState(null);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateIncidentStatus(id, newStatus);
      onIncidentUpdated();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDelete = (incident) => {
    setSelectedIncident(incident);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteIncident(selectedIncident.id);
      onIncidentUpdated();
    } catch (error) {
      console.error('Failed to delete incident:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'under investigation': 'bg-blue-100 text-blue-800',
      'resolved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (!incidents || incidents.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No incidents</h3>
        <p className="mt-1 text-sm text-gray-500">No incidents have been reported yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-medium">
                      {incident.user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {incident.user.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(incident.created_at), 'PPp')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={incident.status}
                    onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                    className={`text-sm rounded-full px-3 py-1 border-0 ${getStatusColor(incident.status)}`}
                  >
                    <option value="pending">Pending Review</option>
                    <option value="under investigation">Under Investigation</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => handleDelete(incident)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{incident.description}</p>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>
                  {incident.latitude.toFixed(6)}, {incident.longitude.toFixed(6)}
                </span>
              </div>

              {incident.images && incident.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {incident.images.map((image, index) => (
                    <img
                      key={index}
                      src={`${import.meta.env.VITE_API_URL}/uploads/${image.image_url}`}
                      alt={`Incident image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              {incident.videos && incident.videos.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {incident.videos.map((video, index) => (
                    <video
                      key={index}
                      src={`${import.meta.env.VITE_API_URL}/uploads/${video.video_url}`}
                      controls
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setExpandedIncident(expandedIncident === incident.id ? null : incident.id)}
                  className="flex items-center text-sm text-gray-500 hover:text-red-600"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {incident.comments?.length || 0} comments
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Incident"
        description="Are you sure you want to delete this incident? This action cannot be undone."
      />
    </>
  );
};

export default AdminIncidentList;