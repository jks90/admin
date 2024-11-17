import React from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, Tag, BookOpen } from 'lucide-react';
import { Question } from '@/interfaces/foro-interfaces';


interface QuestionCardProps {
  question: Question;
  onClick: () => void;
}

export function QuestionCard({ question, onClick }: QuestionCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600">
            {question.title}
          </h3>
          <p className="mt-1 text-gray-600 line-clamp-2">{question.content}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 flex-wrap">
            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              {question.category}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {question.group}
            </span>
            <span>{question.timestamp}</span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {question.answers.length} respuestas
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 ml-6">
          <button className="text-gray-400 hover:text-indigo-600">
            <ThumbsUp className="h-5 w-5" />
          </button>
          <span className="font-medium text-gray-700">{question.votes}</span>
          <button className="text-gray-400 hover:text-red-600">
            <ThumbsDown className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}