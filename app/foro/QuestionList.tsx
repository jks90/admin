import React from 'react';
import { Question } from '@/interfaces/foro-interfaces';
import { QuestionCard } from './QuestionCard';
import { PlusCircle } from 'lucide-react';

interface QuestionListProps {
  questions: Question[];
  onQuestionClick: (question: Question) => void;
  onNewQuestion: () => void;
}

export function QuestionList({ questions, onQuestionClick, onNewQuestion }: QuestionListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Preguntas</h2>
        <button
          onClick={onNewQuestion}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          Nueva Pregunta
        </button>
      </div>
      
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onClick={() => onQuestionClick(question)}
        />
      ))}
      
      {questions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay preguntas que coincidan con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  );
}