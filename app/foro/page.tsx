'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/auth'
import { Progress } from "@/components/ui/progress"
import React, { useState, useEffect } from 'react';
import { useMenu } from "@/app/lib/menuContext";
import {  GraduationCap } from 'lucide-react';
import { Question, Answer, Category, Group } from '@/interfaces/foro-interfaces';
import { SearchBar } from './SearchBar';
import { QuestionList } from './QuestionList';
import { NewQuestionModal } from './NewQuestionModal';
import { QuestionDetail } from './QuestionDetail';

export default function Foro() {

  const { isMenuOpen,openMenu } = useMenu();
  const { user } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = React.useState(13);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      title: "¿Cómo calcular el pH de una disolución tampón?",
      content: "Necesito ayuda para entender el cálculo del pH en una disolución tampón de ácido acético/acetato. ¿Alguien podría explicar el proceso paso a paso?",
      author: "María García",
      category: "Química",
      group: "Primero",
      votes: 25,
      answers: [
        {
          id: 1,
          content: "Para calcular el pH de una disolución tampón, sigue estos pasos:\n\n1. Identifica el ácido débil y su base conjugada\n2. Usa la ecuación de Henderson-Hasselbalch: pH = pKa + log([A-]/[HA])\n3. Sustituye las concentraciones\n4. Resuelve la ecuación",
          author: "Dr. Martínez",
          votes: 15,
          timestamp: "Hace 1 hora",
          isAccepted: true
        }
      ],
      timestamp: "Hace 2 horas"
    },
    // ... other initial questions
  ]);

  const [selectedCategory] = useState<Category | "Todos">("Todos");
  const [selectedGroup] = useState<Group | "Todos">("Todos");
  const [isNewQuestionModalOpen, setIsNewQuestionModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const filteredQuestions = questions.filter(q => 
    (selectedCategory === "Todos" || q.category === selectedCategory) &&
    (selectedGroup === "Todos" || q.group === selectedGroup)
  );

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setProgress(100), 500);
      return () => clearTimeout(timer);
    }else{
      openMenu();
    }
  }, [user, router]);

  React.useEffect(() => {
    // Lógica cuando la barra de progreso llega a 100
    if (progress === 100) {
      // Añadir un delay de 1 segundo antes de ejecutar la función
      const delayTimer = setTimeout(() => {
        handleProgressComplete();
      }, 1000);
      return () => clearTimeout(delayTimer);
    }
  }, [progress]);

  const handleProgressComplete = () => {
    router.push('/');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center w-full max-w-2xl px-4">
          <p className="mb-6 text-lg font-semibold">Loading...</p>
          <Progress value={progress} className="w-full h-4 bg-gray-300 rounded-lg" />
        </div>
      </div>
    );
  }


  const handleNewQuestion = (questionData: { 
    title: string; 
    content: string; 
    category: Category; 
    group: Group 
  }) => {
    const newQuestion: Question = {
      id: questions.length + 1,
      ...questionData,
      author: "Usuario Actual",
      votes: 0,
      answers: [],
      timestamp: "Ahora"
    };
    setQuestions([newQuestion, ...questions]);
  };

  const handleAddAnswer = (questionId: number, content: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newAnswer: Answer = {
          id: (q.answers?.length || 0) + 1,
          content,
          author: "Usuario Actual",
          votes: 0,
          timestamp: "Ahora",
          isAccepted: false
        };
        return {
          ...q,
          answers: [...(q.answers || []), newAnswer]
        };
      }
      return q;
    }));
  };

  return (
    <div className="flex flex-col h-screen  bg-gray-100">
      <div className="flex flex-1 overflow-hidden pt-16">
        <main
          className={`flex-1 p-4 overflow-y-auto transition-all duration-300 ease-in-out ${isMenuOpen ? "ml-64" : "ml-0"
            }`}
        >
          <div className="">

          <div className="bg-white">
            <header className="bg-white shadow">
              <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center gap-3">
                  <GraduationCap size={32} className="text-indigo-600" />
                  <h1 className="text-3xl font-bold text-gray-900">
                    Foro Académico
                  </h1>
                </div>
              </div>
            </header>

            <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <SearchBar />
                {/* <Filters
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedGroup={selectedGroup}
                  setSelectedGroup={setSelectedGroup}
                /> */}
              </div>

              <QuestionList
                questions={filteredQuestions}
                onQuestionClick={setSelectedQuestion}
                onNewQuestion={() => setIsNewQuestionModalOpen(true)}
              />

              {isNewQuestionModalOpen && (
                <NewQuestionModal
                  isOpen={isNewQuestionModalOpen}
                  onClose={() => setIsNewQuestionModalOpen(false)}
                  onSubmit={handleNewQuestion}
                />
              )}

              {selectedQuestion && (
                <QuestionDetail
                  question={selectedQuestion}
                  onClose={() => setSelectedQuestion(null)}
                  onAddAnswer={handleAddAnswer}
                  onVoteAnswer={(questionId, answerId, value) => {
                    setQuestions(questions.map(q => {
                      if (q.id === questionId) {
                        return {
                          ...q,
                          answers: q.answers.map(a => {
                            if (a.id === answerId) {
                              return { ...a, votes: a.votes + value };
                            }
                            return a;
                          })
                        };
                      }
                      return q;
                    }));
                  }}
                  onAcceptAnswer={(questionId, answerId) => {
                    setQuestions(questions.map(q => {
                      if (q.id === questionId) {
                        return {
                          ...q,
                          answers: q.answers.map(a => ({
                            ...a,
                            isAccepted: a.id === answerId
                          }))
                        };
                      }
                      return q;
                    }));
                  }}
                />
              )}
            </main>
          </div>
          </div>
        </main>
      </div>
    </div>
          

  );

}