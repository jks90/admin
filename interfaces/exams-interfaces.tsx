export type Category = 'Quimica' | 'Farmacia' | 'Matemáticas';
export type Group = 'PRIMERO' | 'SEGUNDO' | 'TERCERO' | 'CUARTO';

export interface Exam {
  id: string;
  title: string;
  category: Category;
  group: Group;
  questions: Question[];
  createdAt: Date;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}