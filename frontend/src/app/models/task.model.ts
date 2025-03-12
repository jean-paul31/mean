import { User } from './user.model'; 
export interface Task {
    _id: string;
    title: string;
    completed: boolean;
    assignedTo?: User | null;  // Un utilisateur ou null si non assigné
  }