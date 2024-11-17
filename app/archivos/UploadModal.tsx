import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

const roles = ['ADMIN', 'MANAGER', 'STUDENT', 'GUEST', 'TEACHER'];
const categories = ['Quimica', 'Farmacia', 'Matemáticas'];
const groups = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'CUARTO'];

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [access, setAccess] = useState('public');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle file upload logic here
    console.log({
      file: selectedFile,
      access,
      role: selectedRole,
      category: selectedCategory,
      group: selectedGroup,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upload File</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* File Upload */}
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {selectedFile ? selectedFile.name : 'Any file up to 10MB'}
                  </p>
                </div>
              </div>

              {/* Access Control */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Access</label>
                <div className="mt-2 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="access"
                      value="public"
                      checked={access === 'public'}
                      onChange={(e) => setAccess(e.target.value)}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">Public</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="access"
                      value="private"
                      checked={access === 'private'}
                      onChange={(e) => setAccess(e.target.value)}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">Private</span>
                  </label>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Group Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Group</label>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a group</option>
                  {groups.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}