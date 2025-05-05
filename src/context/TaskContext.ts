import { createContext } from "react";
import { Task } from "../types/Task";

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
