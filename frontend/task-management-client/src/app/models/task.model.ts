export interface Task {
  id?: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  due_date: Date;
  completed: boolean;
  created_at?: Date;
  updated_at?: Date;
}
