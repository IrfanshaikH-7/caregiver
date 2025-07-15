// src/types/task.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'in-progress';
  // Add other task-related properties here
}