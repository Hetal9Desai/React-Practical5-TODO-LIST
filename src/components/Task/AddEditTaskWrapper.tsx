import React from 'react';
import { TaskProvider } from './TaskProvider';
import AddEditTask from './AddEditTask';

export const AddEditTaskWrapper: React.FC = () => {
  return (
    <TaskProvider>
      <AddEditTask />
    </TaskProvider>
  );
};
