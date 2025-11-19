export type Priority = 'Do First' | 'Do Next' | 'Do Later' | 'Skip Today';

export interface Task {
  id: string;
  title: string;
  duration?: string;
  urgency: number;
  importance: number;
  completed: boolean;
  priority: Priority;
}

export const calculatePriority = (urgency: number, importance: number): Priority => {
  const score = urgency * importance;
  
  if (score >= 20) return 'Do First';
  if (score >= 12) return 'Do Next';
  if (score >= 6) return 'Do Later';
  return 'Skip Today';
};
