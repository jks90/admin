import React from 'react';
import { Bell, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white h-16 fixed top-0 right-0 left-64 shadow-sm z-10">
      <div className="flex items-center justify-between h-full px-6">
        <h1 className="text-xl font-semibold text-gray-800">Gestión de Usuarios</h1>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}