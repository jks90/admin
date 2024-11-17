import React, { useState } from 'react';
import { X, Plus, Save } from 'lucide-react';
import type { Category, Group, Question, Exam } from '@/interfaces/exams-interfaces';

interface ExamFormProps {
  initialData?: Exam;
  onSubmit: (data: {
    title: string;
    category: Category;
    group: Group;
    questions: Question[];
  }) => void;
  onCancel: () => void;
}

const categories: Category[] = ['Quimica', 'Farmacia', 'Matemáticas'];
const groups: Group[] = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'CUARTO'];

export function ExamForm({ initialData, onSubmit, onCancel }: ExamFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [category, setCategory] = useState<Category>(initialData?.category ?? 'Quimica');
  const [group, setGroup] = useState<Group>(initialData?.group ?? 'PRIMERO');
  const [questions, setQuestions] = useState<Question[]>(initialData?.questions ?? []);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: crypto.randomUUID(),
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: keyof Question, value: string | string[] | number) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, category, group, questions });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Grupo</label>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value as Group)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {groups.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium">Pregunta {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="text-red-600 hover:text-red-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Texto de la pregunta
                </label>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${question.id}`}
                      checked={question.correctAnswer === optionIndex}
                      onChange={() => updateQuestion(index, 'correctAnswer', optionIndex)}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...question.options];
                        newOptions[optionIndex] = e.target.value;
                        updateQuestion(index, 'options', newOptions);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder={`Opción ${optionIndex + 1}`}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Añadir pregunta
        </button>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          <Save size={20} />
          {initialData ? 'Actualizar examen' : 'Guardar examen'}
        </button>
      </div>
    </form>
  );
}