import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { TaskListWrapper } from './components/Task/TaskListWrapper';
import { AddEditTaskWrapper } from './components/Task/AddEditTaskWrapper';

const NotFound: React.FC = () => (
  <div className="text-center mt-5">
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <button
      className="btn btn-primary"
      onClick={() => (window.location.href = '/')}
    >
      Go Home
    </button>
  </div>
);

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
