import React from 'react';
import { X } from 'lucide-react';

interface FilterMenuProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    role: string;
    category: string;
    group: string;
    access: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

const roles = ['All', 'ADMIN', 'MANAGER', 'STUDENT', 'GUEST', 'TEACHER'];
const categories = ['All', 'Quimica', 'Farmacia', 'Matemáticas'];
const groups = ['All', 'PRIMERO', 'SEGUNDO', 'TERCERO', 'CUARTO'];
const accessTypes = ['All', 'public', 'private'];

export default function FilterMenu({ isOpen, onClose, filters, onFilterChange }: FilterMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={filters.role}
              onChange={(e) => onFilterChange('role', e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            >
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Group Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
            <select
              value={filters.group}
              onChange={(e) => onFilterChange('group', e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            >
              {groups.map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          {/* Access Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Access</label>
            <select
              value={filters.access}
              onChange={(e) => onFilterChange('access', e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            >
              {accessTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}