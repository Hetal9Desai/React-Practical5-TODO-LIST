import React, { useState } from "react";
import "./TodoApp.css";
import { FaEdit, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { Todo } from "./Types";

const TodoAppUI: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      date: new Date().toLocaleString(),
    };

    setTodos([newTodo, ...todos]);

    setInput("");
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Enter Todo"
        />
        <button onClick={handleAdd}>Add Todo</button>
      </div>

      <div className="filter">
        <button>All</button>
        <button>Completed</button>
        <button>Incomplete</button>
      </div>

      <div className="todo-list">
        {/* Example Todo Item */}
        <div className="todo-item">
          <input type="checkbox" />
          <div className="todo-text">
            <span className="text">Sample Todo Item</span>
            <span className="date">2025-05-01 10:00 AM</span>
          </div>
          <div className="todo-actions">
            <button>
              <FaEdit />
            </button>
            <button>
              <FaTrashAlt />
            </button>
          </div>
        </div>

        {/* Completed Todo Item */}
        <div className="todo-item completed">
          <input type="checkbox" checked readOnly />
          <div className="todo-text">
            <span className="text">Completed Task Example</span>
            <span className="date">2025-04-30 3:15 PM</span>
          </div>
          <div className="todo-actions">
            <button>
              <FaCheckCircle />
            </button>
            <button>
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoAppUI;
