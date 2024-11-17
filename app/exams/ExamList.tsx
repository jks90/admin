import React from 'react';
import { Plus, FileText, Filter } from 'lucide-react';
import type { Category, Group, Exam } from '@/interfaces/exams-interfaces';

interface ExamListProps {
  exams: Exam[];
  selectedCategory: Category | 'all';
  selectedGroup: Group | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  onGroupChange: (group: Group | 'all') => void;
  onCreateExam: () => void;
  onExamClick: (exam: Exam) => void;
}

const categories: Category[] = ['Quimica', 'Farmacia', 'Matemáticas'];
const groups: Group[] = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'CUARTO'];

export function ExamList({
  exams,
  selectedCategory,
  selectedGroup,
  onCategoryChange,
  onGroupChange,
  onCreateExam,
  onExamClick,
}: ExamListProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Exámenes</h2>
        <button
          onClick={onCreateExam}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          Crear Examen
        </button>
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow">
        <Filter size={20} className="text-gray-500" />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value as Category | 'all')}
          className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="all">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={selectedGroup}
          onChange={(e) => onGroupChange(e.target.value as Group | 'all')}
          className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="all">Todos los grupos</option>
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exams.map((exam) => (
          <div
            key={exam.id}
            onClick={() => onExamClick(exam)}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{exam.title}</h3>
                <div className="mt-2 space-y-1">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded">
                    {exam.category}
                  </span>
                  <span className="inline-block ml-2 bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded">
                    {exam.group}
                  </span>
                </div>
              </div>
              <FileText className="text-gray-400" size={24} />
            </div>
            <div className="mt-4 text-sm text-gray-600">
              {exam.questions.length} preguntas
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Creado el {new Date(exam.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}