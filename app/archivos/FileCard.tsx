import React from 'react';
import { FileText, Download, Trash2 } from 'lucide-react';

interface FileCardProps {
  name: string;
  category: string;
  group: string;
  access: 'public' | 'private';
  role: string;
  uploadedBy: string;
  uploadDate: string;
}

export default function FileCard({
  name,
  category,
  group,
  access,
  role,
  uploadedBy,
  uploadDate,
}: FileCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="h-8 w-8 text-indigo-600" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{uploadedBy}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          access === 'public' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {access}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Category:</span>
          <span className="font-medium">{category}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Group:</span>
          <span className="font-medium">{group}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Role:</span>
          <span className="font-medium">{role}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Date:</span>
          <span className="font-medium">{new Date(uploadDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button className="p-2 text-gray-400 hover:text-gray-500">
          <Download className="h-5 w-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-red-500">
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}