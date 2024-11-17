import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Buscar preguntas..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option>Más recientes</option>
        <option>Más votados</option>
        <option>Sin responder</option>
      </select>
    </div>
  );
}