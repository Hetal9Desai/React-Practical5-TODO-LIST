import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from '../../types/Task/types';
import { useTaskContext } from './TaskProvider';

const taskSchema = z.object({
  id: z.string().uuid().optional().or(z.literal('')),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  desc: z.string().min(10, 'Description must be at least 10 characters'),
  status: z.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE]),
});
type TaskFormData = z.infer<typeof taskSchema>;

const AddEditTask: React.FC = () => {
  const { tasks, setTasks } = useTaskContext();
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      id: '',
      title: '',
      desc: '',
      status: TaskStatus.TODO,
    },
  });

  useEffect(() => {
    const taskData = tasks?.find((task) => task.id === taskId);
    if (taskData) {
      reset({ ...taskData });
    } else {
      reset({ id: '', title: '', desc: '', status: TaskStatus.TODO });
    }
  }, [taskId, tasks, reset]);

  const onSubmit = (data: TaskFormData) => {
    const taskData = tasks?.find((task) => task.id === taskId);
    let allTasks = tasks ? [...tasks] : [];

    if (taskData) {
      const index = allTasks.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        allTasks[index] = { ...allTasks[index], ...data };
      }
    } else {
      const newTask: Task = { ...data, id: uuidv4() };
      allTasks = [...allTasks, newTask];
    }

    setTasks(allTasks);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">
            {taskId ? 'Update Task' : 'Add Task'}
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="row g-3"
            noValidate
          >
            <input type="hidden" {...register('id')} />

            <div className="col-12">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                {...register('title')}
              />
              {errors.title && (
                <span className="text-danger">{errors.title.message}</span>
              )}
            </div>

            <div className="col-12">
              <textarea
                className="form-control"
                placeholder="Description"
                rows={4}
                {...register('desc')}
              />
              {errors.desc && (
                <span className="text-danger">{errors.desc.message}</span>
              )}
            </div>

            <div className="col-12">
              <select className="form-select" {...register('status')}>
                <option value={TaskStatus.TODO}>To Do</option>
                <option value={TaskStatus.IN_PROGRESS} disabled={!taskId}>
                  In Progress
                </option>
                <option value={TaskStatus.DONE} disabled={!taskId}>
                  Done
                </option>
              </select>
            </div>

            <div className="col-6">
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
            </div>
            <div className="col-6">
              <button type="submit" className="btn btn-primary w-100">
                {taskId ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditTask;
