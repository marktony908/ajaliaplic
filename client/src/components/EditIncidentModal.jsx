import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { updateIncident } from '../services/incidentService';
import { MapPin, X } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const LocationPicker = ({ position, setPosition }) => {
  useMapEvents({
    click: (e) => setPosition([e.latlng.lat, e.latlng.lng]),
  });

  return position && <Marker position={position} />;
};

const EditIncidentModal = ({ isOpen, onClose, incident, onIncidentUpdated }) => {
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (incident) {
      setDescription(incident.description || '');
      setPosition([incident.latitude, incident.longitude]);
    }
  }, [incident]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!position) {
      console.error('Location is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await updateIncident(incident.id, {
        description,
        latitude: position[0],
        longitude: position[1],
      });
      onIncidentUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating incident:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setPosition([coords.latitude, coords.longitude]),
      (error) => console.error('Error retrieving location:', error)
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Edit Incident</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <X size={20} />
            </button>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="4"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="h-48">
                <MapContainer
                  center={position || [0, 0]}
                  zoom={position ? 13 : 2}
                  className="h-full"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationPicker position={position} setPosition={setPosition} />
                </MapContainer>
              </div>
              <button
                type="button"
                onClick={handleUseMyLocation}
                className="mt-2 flex items-center px-3 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Use My Location
              </button>
            </div>
            <footer className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 text-white rounded-md ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isSubmitting ? 'Updating...' : 'Update'}
              </button>
            </footer>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default EditIncidentModal;
