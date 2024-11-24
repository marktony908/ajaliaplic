import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createComment, deleteComment } from '../services/commentService';
import { toast } from 'react-hot-toast';
import { Send, Trash2 } from 'lucide-react';

const IncidentComments = ({ incidentId, comments, onCommentAdded, onCommentDeleted }) => {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const comment = await createComment(incidentId, newComment);
      onCommentAdded(comment);
      setNewComment('');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(incidentId, commentId);
      onCommentDeleted(commentId);
    } catch (error) {
      toast.error('Failed to delete comment');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
        />
        <button
          type="submit"
          className="p-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-medium">
                  {comment.user.username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {comment.user.username}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                </div>
                {(user.id === comment.user.id || user.is_admin) && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentComments;