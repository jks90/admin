import React from 'react';
import { Edit, ArrowLeft } from 'lucide-react';
import type { Exam } from '@/interfaces/exams-interfaces';

interface ExamViewProps {
  exam: Exam;
  onEdit: () => void;
  onBack: () => void;
}

export function ExamView({ exam, onEdit, onBack }: ExamViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={20} />
          Volver
        </button>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Edit size={20} />
          Editar
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{exam.title}</h1>
              <div className="mt-2 space-x-2">
                <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded">
                  {exam.category}
                </span>
                <span className="inline-block bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded">
                  {exam.group}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Creado el {new Date(exam.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {exam.questions.map((question, index) => (
              <div key={question.id} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Pregunta {index + 1}: {question.text}
                </h3>
                <div className="space-y-3 ml-4">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        question.correctAnswer === optIndex
                          ? 'bg-green-100 text-green-800'
                          : 'bg-white'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                          question.correctAnswer === optIndex
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-gray-300'
                        }`}
                      >
                        {String.fromCharCode(65 + optIndex)}
                      </div>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}