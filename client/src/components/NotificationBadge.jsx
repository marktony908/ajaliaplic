import { useNotifications } from '../context/NotificationContext';

const NotificationBadge = () => {
  const { notifications } = useNotifications();
  
  // Safely handle notifications array
  const unreadCount = notifications?.filter(n => !n.read)?.length || 0;

  if (unreadCount === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-600 rounded-full">
      {unreadCount}
    </span>
  );
};

export default NotificationBadge;