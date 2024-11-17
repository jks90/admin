import React from 'react';
import { Category, Group } from '@/interfaces/foro-interfaces';

interface FiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedGroup: string;
  setSelectedGroup: (group: string) => void;
}

export function Filters({ selectedCategory, setSelectedCategory, selectedGroup, setSelectedGroup }: FiltersProps) {
  const categories: Category[] = ["Química", "Farmacia", "Matemáticas"];
  const groups: Group[] = ["Primero", "Segundo", "Tercero", "Cuarto"];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <span className="text-sm font-semibold text-gray-700 w-full">Categorías:</span>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        <span className="text-sm font-semibold text-gray-700 w-full">Curso:</span>
        {groups.map((group) => (
          <button
            key={group}
            onClick={() => setSelectedGroup(group)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedGroup === group
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {group}
          </button>
        ))}
      </div>
    </div>
  );
}