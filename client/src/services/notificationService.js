import axios from './axiosConfig';

export const getNotifications = async () => {
  const response = await axios.get('/notifications');
  return response.data;
};

export const markNotificationAsRead = async (id) => {
  const response = await axios.put(`/notifications/${id}`);
  return response.data;
};