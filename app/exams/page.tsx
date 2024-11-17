'use client'
import React, { useState } from 'react';
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/auth'
import { Progress } from "@/components/ui/progress"
import { useMenu } from "@/app/lib/menuContext";

import { GraduationCap } from 'lucide-react';
import { ExamList } from './ExamList';
import { ExamForm } from './ExamForm';
import { ExamView } from './ExamView';
import type { Exam, Category, Group } from '@/interfaces/exams-interfaces';
import { mockExams } from './ExamData';



export default function Examens() {

  const { isMenuOpen, openMenu } = useMenu();
  const { user } = useAuth();
  const router = useRouter();

  const [progress, setProgress] = React.useState(13);

  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedGroup, setSelectedGroup] = useState<Group | 'all'>('all');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const filteredExams = exams.filter((exam) => {
    const matchesCategory = selectedCategory === 'all' || exam.category === selectedCategory;
    const matchesGroup = selectedGroup === 'all' || exam.group === selectedGroup;
    return matchesCategory && matchesGroup;
  });

  const handleCreateExam = (examData: Omit<Exam, 'id' | 'createdAt'>) => {
    const newExam: Exam = {
      ...examData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setExams([...exams, newExam]);
    setIsCreating(false);
  };

  const handleUpdateExam = (examData: Omit<Exam, 'id' | 'createdAt'>) => {
    if (!selectedExam) return;

    const updatedExam: Exam = {
      ...examData,
      id: selectedExam.id,
      createdAt: selectedExam.createdAt,
    };

    setExams(exams.map((exam) =>
      exam.id === selectedExam.id ? updatedExam : exam
    ));

    setSelectedExam(updatedExam);
    setIsEditing(false);
  };

  const handleExamClick = (exam: Exam) => {
    setSelectedExam(exam);
  };

  const handleBack = () => {
    setSelectedExam(null);
    setIsEditing(false);
  };


  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setProgress(100), 500);
      return () => clearTimeout(timer);
    } else {
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
                      Sistema de Gestión de Exámenes
                    </h1>
                  </div>
                </div>
              </header>

              <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isCreating ? (
                  <ExamForm
                    onSubmit={handleCreateExam}
                    onCancel={() => setIsCreating(false)}
                  />
                ) : isEditing && selectedExam ? (
                  <ExamForm
                    initialData={selectedExam}
                    onSubmit={handleUpdateExam}
                    onCancel={() => setIsEditing(false)}
                  />
                ) : selectedExam ? (
                  <ExamView
                    exam={selectedExam}
                    onEdit={() => setIsEditing(true)}
                    onBack={handleBack}
                  />
                ) : (
                  <ExamList
                    exams={filteredExams}
                    selectedCategory={selectedCategory}
                    selectedGroup={selectedGroup}
                    onCategoryChange={setSelectedCategory}
                    onGroupChange={setSelectedGroup}
                    onCreateExam={() => setIsCreating(true)}
                    onExamClick={handleExamClick}
                  />
                )}
              </main>
            </div>


          </div>
        </main>
      </div>
    </div>
  )

}