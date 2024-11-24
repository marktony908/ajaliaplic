import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const addReaction = async (incidentId, reactionType) => {
  const response = await axios.post(
    `${API_URL}/incidents/${incidentId}/reactions`,
    { reaction_type: reactionType },
    { withCredentials: true }
  );
  return response.data;
};

export const removeReaction = async (incidentId, reactionType) => {
  await axios.delete(`${API_URL}/incidents/${incidentId}/reactions/${reactionType}`, {
    withCredentials: true
  });
};