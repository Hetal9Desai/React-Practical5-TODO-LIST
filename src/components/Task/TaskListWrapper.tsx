import React from 'react';
import { TaskProvider } from './TaskProvider';
import TaskList from './TaskList';

export const TaskListWrapper: React.FC = () => {
  return (
    <TaskProvider>
      <TaskList />
    </TaskProvider>
  );
};
