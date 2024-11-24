import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bell, Check } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { markNotificationAsRead } from '../services/notificationService';

const NotificationDropdown = () => {
  const { notifications, markAsRead } = useNotifications();

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      markAsRead(id);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const unreadCount = notifications?.filter(n => !n.read)?.length || 0;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-white text-xs">
              {unreadCount}
            </span>
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-96 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 z-50">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900">Notifications</p>
          </div>

          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {(!notifications || notifications.length === 0) ? (
              <div className="px-4 py-6 text-center text-sm text-gray-500">
                No notifications
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <Menu.Item key={notification.id}>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'bg-gray-50' : ''
                        } px-4 py-3 flex items-start ${
                          !notification.read ? 'bg-red-50' : ''
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                            {notification.message}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {new Date(notification.created_at).toLocaleString()}
                          </p>
                        </div>
                        {!notification.read && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleMarkAsRead(notification.id);
                            }}
                            className="ml-3 flex-shrink-0 text-red-600 hover:text-red-700"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </div>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NotificationDropdown;