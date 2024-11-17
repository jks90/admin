import React from 'react';

interface QuickEmailSelectorProps {
  show: boolean;
  onSelect: (email: string) => void;
  onClose: () => void;
}

export default function QuickEmailSelector({ show, onSelect, onClose }: QuickEmailSelectorProps) {
  const quickEmails = [
    'support@example.com',
    'info@example.com',
    'contact@example.com',
    'sales@example.com'
  ];

  if (!show) return null;

  return (
    <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200">
      <div className="p-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Quick Emails</span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
        <div className="space-y-1">
          {quickEmails.map((email) => (
            <button
              key={email}
              onClick={() => {
                onSelect(email);
                onClose();
              }}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {email}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}