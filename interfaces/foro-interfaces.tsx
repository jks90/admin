export type Answer = {
    id: number;
    content: string;
    author: string;
    votes: number;
    timestamp: string;
    isAccepted: boolean;
  };
  
  export type Question = {
    id: number;
    title: string;
    content: string;
    author: string;
    category: string;
    group: string;
    votes: number;
    answers: Answer[];
    timestamp: string;
  };
  
  export type Category = "Química" | "Farmacia" | "Matemáticas";
  export type Group = "Primero" | "Segundo" | "Tercero" | "Cuarto";