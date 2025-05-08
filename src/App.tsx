import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { TaskListWrapper } from './components/Task/TaskListWrapper';
import { AddEditTaskWrapper } from './components/Task/AddEditTaskWrapper';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<TaskListWrapper />} />
          <Route path="/add-task" element={<AddEditTaskWrapper />} />
          <Route path="/edit-task/:id" element={<AddEditTaskWrapper />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
