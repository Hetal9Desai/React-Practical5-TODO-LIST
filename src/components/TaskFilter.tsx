import React from 'react';
import { TaskStatus } from '../types/Task';

interface TaskFilterProps {
  filters: {
    title: string;
    desc: string;
    both: string;
    status: string;
  };
  handleFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    filterType: string,
  ) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  filters,
  handleFilterChange,
}) => (
  <div className="card mb-4 shadow-sm">
    <div className="card-body">
      <h5 className="card-title">Filter Tasks</h5>
      <div className="row mb-4">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Title"
            value={filters.title}
            onChange={(e) => handleFilterChange(e, 'title')}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Description"
            value={filters.desc}
            onChange={(e) => handleFilterChange(e, 'desc')}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Title / Description"
            value={filters.both}
            onChange={(e) => handleFilterChange(e, 'both')}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filters.status}
            onChange={(e) => handleFilterChange(e, 'status')}
          >
            <option value="">All Status</option>
            <option value={TaskStatus.TODO}>To Do</option>
            <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
            <option value={TaskStatus.DONE}>Done</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default TaskFilter;
