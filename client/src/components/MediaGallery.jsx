import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const MediaGallery = ({ media }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const renderMediaPreview = (item) => {
    if (item.type === 'image') {
      return (
        <img
          src={item.url}
          alt="Media preview"
          className="w-full h-full object-cover rounded-lg"
        />
      );
    } else if (item.type === 'video') {
      return (
        <video
          src={item.url}
          controls
          className="w-full h-full object-contain rounded-lg"
        />
      );
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {media.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedMedia(item);
              setCurrentIndex(index);
            }}
            className="relative aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
          >
            {renderMediaPreview(item)}
          </button>
        ))}
      </div>

      <Dialog
        open={selectedMedia !== null}
        onClose={() => setSelectedMedia(null)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/90" />

        <div className="relative z-50 w-full max-w-5xl px-4">
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative aspect-video">
            {renderMediaPreview(media[currentIndex])}
          </div>

          <div className="absolute inset-y-0 left-4 flex items-center">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-4 flex items-center">
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              {media.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MediaGallery;