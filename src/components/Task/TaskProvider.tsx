import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { Task } from '../../types/Task/types';

export interface TaskContextType {
  tasks: Task[] | undefined;
  setTasks: Dispatch<SetStateAction<Task[] | undefined>>;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return ctx;
};
