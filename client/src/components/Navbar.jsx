import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle, LogOut } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <AlertTriangle className="text-red-600 w-8 h-8" />
            <span className="text-2xl font-bold text-red-600">Ajali!</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <NotificationDropdown />
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-medium">
                        {user.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-700">{user.username}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;