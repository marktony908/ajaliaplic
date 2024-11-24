import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addReaction, removeReaction } from '../services/reactionService';
import { toast } from 'react-hot-toast';
import { Heart, Share2 } from 'lucide-react';

const IncidentReactions = ({ incident, onReactionUpdated }) => {
  const { user } = useAuth();
  const [isSharing, setIsSharing] = useState(false);

  const handleLike = async () => {
    try {
      if (incident.user_reactions?.includes('like')) {
        await removeReaction(incident.id, 'like');
      } else {
        await addReaction(incident.id, 'like');
      }
      onReactionUpdated();
    } catch (error) {
      toast.error('Failed to update reaction');
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      await addReaction(incident.id, 'share');
      await navigator.share({
        title: 'Incident Report',
        text: incident.description,
        url: window.location.href,
      });
      onReactionUpdated();
    } catch (error) {
      if (error.name !== 'AbortError') {
        toast.error('Failed to share');
      }
    }
    setIsSharing(false);
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleLike}
        className={`flex items-center space-x-1 ${
          incident.user_reactions?.includes('like')
            ? 'text-red-600'
            : 'text-gray-500 hover:text-red-600'
        }`}
      >
        <Heart
          className={`w-5 h-5 ${
            incident.user_reactions?.includes('like') ? 'fill-current' : ''
          }`}
        />
        <span>{incident.reactions?.like || 0}</span>
      </button>

      <button
        onClick={handleShare}
        disabled={isSharing}
        className="flex items-center space-x-1 text-gray-500 hover:text-red-600"
      >
        <Share2 className="w-5 h-5" />
        <span>{incident.reactions?.share || 0}</span>
      </button>
    </div>
  );
};

export default IncidentReactions;