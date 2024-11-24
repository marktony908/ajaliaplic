import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { deleteIncident } from '../services/incidentService';
import { MapPin, Trash2, AlertTriangle, Edit2 } from 'lucide-react';
import { format } from 'date-fns';
import EditIncidentModal from './EditIncidentModal.jsx';
import ConfirmDialog from './ConfirmDialog';

const IncidentList = ({ incidents, onIncidentUpdated }) => {
  const { user } = useAuth();
  const [editingIncident, setEditingIncident] = useState(null);
  const [deletingIncident, setDeletingIncident] = useState(null);

  const handleDelete = async () => {
    if (!deletingIncident) return;

    try {
      await deleteIncident(deletingIncident.id);
      onIncidentUpdated();
    } catch (error) {
      console.error('Error deleting incident:', error);
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
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No incidents</h3>
        <p className="mt-1 text-sm text-gray-500">No incidents have been reported yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-medium">
                      {incident.user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {incident.user?.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(incident.created_at), 'PPp')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(incident.status)}`}>
                    {incident.status}
                  </span>
                  {(user.id === incident.user_id || user.is_admin) && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingIncident(incident)}
                        className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"
                        title="Edit incident"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setDeletingIncident(incident)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
                        title="Delete incident"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4">{incident.description}</p>

              {/* Location */}
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>
                  {incident.latitude.toFixed(6)}, {incident.longitude.toFixed(6)}
                </span>
              </div>

              {/* Media Grid */}
              {incident.images && incident.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {incident.images.map((image, index) => (
                    <div key={index} className="relative aspect-video">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${image.image_url}`}
                        alt={`Incident image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}

              {incident.videos && incident.videos.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {incident.videos.map((video, index) => (
                    <div key={index} className="relative aspect-video">
                      <video
                        src={`${import.meta.env.VITE_API_URL}/uploads/${video.video_url}`}
                        controls
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Status Timeline */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${
                    incident.status === 'resolved' 
                      ? 'bg-green-500'
                      : incident.status === 'rejected'
                      ? 'bg-red-500'
                      : incident.status === 'under investigation'
                      ? 'bg-blue-500'
                      : 'bg-yellow-500'
                  }`} />
                  <span className="text-gray-600">
                    {incident.status === 'pending' 
                      ? 'Awaiting review'
                      : incident.status === 'under investigation'
                      ? 'Under investigation'
                      : incident.status === 'resolved'
                      ? 'Incident resolved'
                      : 'Report rejected'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingIncident && (
        <EditIncidentModal
          isOpen={!!editingIncident}
          onClose={() => setEditingIncident(null)}
          incident={editingIncident}
          onIncidentUpdated={onIncidentUpdated}
        />
      )}

      <ConfirmDialog
        isOpen={!!deletingIncident}
        onClose={() => setDeletingIncident(null)}
        onConfirm={handleDelete}
        title="Delete Incident"
        message="Are you sure you want to delete this incident? This action cannot be undone."
      />
    </>
  );
};

export default IncidentList;