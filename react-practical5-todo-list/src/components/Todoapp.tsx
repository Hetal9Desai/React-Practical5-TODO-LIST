import React, { useState, useEffect } from "react";
import "./TodoApp.css";
import { FaTrashAlt } from "react-icons/fa";
import { Todo } from "./Types";

const STORAGE_KEY = "todosData";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos).todos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ todos }));
    }
  }, [todos]);

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

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <div className="todo-text">
              <span className="text">{todo.text}</span>
              <span className="date">{todo.date}</span>
            </div>
            <div className="todo-actions">
              <button onClick={() => handleDelete(todo.id)}>
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
