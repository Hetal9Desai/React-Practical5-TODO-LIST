import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { TaskListWrapper } from './components/Task/TaskListWrapper';
import { AddEditTaskWrapper } from './components/Task/AddEditTaskWrapper';
import NotFound from './components/NotFound/NotFound';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<TaskListWrapper />} />
          <Route path="/add-task" element={<AddEditTaskWrapper />} />
          <Route path="/edit-task/:taskId" element={<AddEditTaskWrapper />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
