import { FolderOpen } from 'lucide-react';

const EmptyState = ({ title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <FolderOpen className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-center mb-6">{description}</p>
      {action}
    </div>
  );
};

export default EmptyState;