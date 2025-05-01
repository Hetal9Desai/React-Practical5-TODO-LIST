import React from "react";
import "./TodoApp.css";
import { FaEdit, FaTrashAlt, FaCheckCircle } from "react-icons/fa";

const TodoAppUI: React.FC = () => {
  return (
    <div className="todo-container">
      <div className="todo-header">
        <input type="text" placeholder="Enter Todo" />
        <button>Add Todo</button>
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
