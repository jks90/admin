import React, { useState } from 'react';
import {  ThumbsUp, ThumbsDown, Tag, BookOpen, CheckCircle } from 'lucide-react';
import { Question, Answer } from '@/interfaces/foro-interfaces';
interface QuestionDetailProps {
  question: Question;
  onClose: () => void;
  onAddAnswer: (questionId: number, content: string) => void;
  onVoteAnswer: (questionId: number, answerId: number, value: 1 | -1) => void;
  onAcceptAnswer: (questionId: number, answerId: number) => void;
}

export function QuestionDetail({ 
  question, 
  onClose, 
  onAddAnswer, 
  onVoteAnswer,
  onAcceptAnswer 
}: QuestionDetailProps) {
  const [newAnswer, setNewAnswer] = useState('');

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAnswer.trim()) {
      onAddAnswer(question.id, newAnswer);
      setNewAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900">{question.title}</h2>
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  {question.category}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {question.group}
                </span>
                <span>{question.timestamp}</span>
                <span>por {question.author}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 px-3 py-1"
            >
              ✕
            </button>
          </div>
          <p className="mt-4 text-gray-700 whitespace-pre-wrap">{question.content}</p>
        </div>

        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4">
            {question.answers.length} Respuestas
          </h3>
          <div className="space-y-6">
            {question.answers.map((answer: Answer) => (
              <div key={answer.id} className="border-b last:border-0 pb-6 last:pb-0">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <button 
                      onClick={() => onVoteAnswer(question.id, answer.id, 1)}
                      className="text-gray-400 hover:text-indigo-600"
                    >
                      <ThumbsUp className="h-5 w-5" />
                    </button>
                    <span className="font-medium text-gray-700">{answer.votes}</span>
                    <button 
                      onClick={() => onVoteAnswer(question.id, answer.id, -1)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <ThumbsDown className="h-5 w-5" />
                    </button>
                    {answer.isAccepted && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 whitespace-pre-wrap">{answer.content}</p>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                      <span>{answer.timestamp}</span>
                      <span>por {answer.author}</span>
                    </div>
                  </div>
                  {!answer.isAccepted && (
                    <button
                      onClick={() => onAcceptAnswer(question.id, answer.id)}
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      Marcar como correcta
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tu Respuesta</h3>
          <form onSubmit={handleSubmitAnswer}>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Escribe tu respuesta..."
              required
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Publicar Respuesta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}