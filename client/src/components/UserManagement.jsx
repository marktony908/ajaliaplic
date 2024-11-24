import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser, banUser } from '../services/userService';
import { toast } from 'react-hot-toast';
import { FaTrash, FaBan } from 'react-icons/fa';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleBanUser = async (id, isBanned) => {
    try {
      await banUser(id, isBanned);
      fetchUsers();
      toast.success(isBanned ? 'User banned successfully' : 'User unbanned successfully');
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBanUser(user.id, !user.is_banned)}
                  className={`p-2 rounded-full ${
                    user.is_banned
                      ? 'text-gray-600 hover:text-gray-800'
                      : 'text-yellow-600 hover:text-yellow-800'
                  }`}
                >
                  <FaBan />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="p-2 rounded-full text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;