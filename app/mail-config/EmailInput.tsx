import React, { useState } from 'react';
import { Users } from 'lucide-react';
import QuickEmailSelector from './QuickEmailSelector';
import { EmailInputProps } from '@/interfaces/mail-interfaces';


export default function EmailInput({ value, onChange, onSubmit }: EmailInputProps) {
  const [showQuickEmails, setShowQuickEmails] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="relative flex gap-2">
      <div className="flex-1 relative">
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add email address"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={() => setShowQuickEmails(!showQuickEmails)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <Users className="h-5 w-5" />
        </button>
        <QuickEmailSelector
          show={showQuickEmails}
          onSelect={(email) => {
            onChange(email);
            setShowQuickEmails(false);
          }}
          onClose={() => setShowQuickEmails(false)}
        />
      </div>
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Add
      </button>
    </div>
  );
}