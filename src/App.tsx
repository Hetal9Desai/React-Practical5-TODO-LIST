// import {
//   BrowserRouter as BrowserRouter,
//   Route,
//   Routes,
// } from "react-router-dom";
// import { TaskProvider } from "./components/Task/TaskProvider";
// import Navbar from "./components/Navbar/Navbar";
// import AddEditTask from "./components/Task/AddEditTask";
// import TaskList from "./components/Task/TaskList";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <TaskProvider>
//         <main className="container mt-4">
//           <Routes>
//             <Route path="/" element={<TaskList />} />
//             <Route path="/add-task" element={<AddEditTask />} />
//             <Route path="/edit-task/:id" element={<AddEditTask />} />
//           </Routes>
//         </main>
//       </TaskProvider>
//     </BrowserRouter>
//   );
// };

// export default App;

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
