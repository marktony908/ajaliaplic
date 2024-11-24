import { useState, useCallback } from 'react';
import { Dialog } from '@headlessui/react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useDropzone } from 'react-dropzone';
import { createIncident } from '../services/incidentService';
import { MapPin, Upload, X, Image, Film } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const LocationPicker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const CreateIncidentModal = ({ isOpen, onClose, onIncidentCreated }) => {
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.filter(file => file.size <= 100 * 1024 * 1024);
    
    const newFiles = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video'
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
      'video/*': []
    },
    onDrop,
    maxSize: 100 * 1024 * 1024
  });

  const removeFile = (index) => {
    setFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!position) {
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('description', description);
      formData.append('latitude', position[0]);
      formData.append('longitude', position[1]);
      files.forEach(({ file }) => formData.append('files', file));

      const incident = await createIncident(formData);
      onIncidentCreated(incident);
      setDescription('');
      setPosition(null);
      setFiles([]);
      onClose();
    } catch (error) {
      console.error('Error creating incident:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
      },
      () => console.error('Failed to get location')
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        <div className="relative bg-white rounded-2xl max-w-3xl w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl font-bold text-gray-900">
              Report New Incident
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                rows="3"
                required
                placeholder="Describe the incident..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  className="flex items-center text-sm text-red-600 hover:text-red-700"
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  Use my location
                </button>
              </div>
              <div className="h-64 rounded-lg overflow-hidden">
                <MapContainer
                  center={[-1.2921, 36.8219]}
                  zoom={13}
                  className="h-full"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationPicker position={position} setPosition={setPosition} />
                </MapContainer>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media Files
              </label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer ${
                  isDragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-500'
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 text-center">
                    {isDragActive
                      ? 'Drop the files here'
                      : 'Drag and drop files here, or click to select files'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Supports images and videos up to 100MB
                  </p>
                </div>
              </div>

              {files.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {files.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        {file.type === 'image' ? (
                          <img
                            src={file.preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {uploading ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateIncidentModal;