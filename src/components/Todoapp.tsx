import React, { useState, useEffect } from "react";
import "./TodoApp.css";
import { FaTrashAlt, FaEdit, FaCheckCircle } from "react-icons/fa";
import { Todo } from "./Types";

const STORAGE_KEY = "todosData";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const storedTodos = Array.isArray(parsed.todos) ? parsed.todos : [];
        setTodos(storedTodos);
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
        localStorage.removeItem(STORAGE_KEY);
        setTodos([]);
      }
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

  const handleEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSave = (id: number) => {
    const trimmedText = editText.trim();
    if (trimmedText === "") return;

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo
      )
    );
    setEditId(null);
    setEditText("");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

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
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>

      <div className="todo-list">
        {filteredTodos.map((todo) => (
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
              {editId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <>
                  <span className="text">{todo.text}</span>
                  <span className="date">{todo.date}</span>
                </>
              )}
            </div>
            <div className="todo-actions">
              {editId === todo.id ? (
                <button
                  onClick={() => handleSave(todo.id)}
                  disabled={editText.trim() === ""}
                >
                  <FaCheckCircle />
                </button>
              ) : (
                <button onClick={() => handleEdit(todo.id, todo.text)}>
                  <FaEdit />
                </button>
              )}

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
