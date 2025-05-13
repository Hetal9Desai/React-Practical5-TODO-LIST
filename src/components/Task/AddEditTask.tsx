import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Task, TaskStatus } from '../../types/Task/types';
import { useTaskContext } from './TaskProvider';

const taskSchema = z.object({
  id: z.string().min(1).uuid().optional(), // Ensure id is a valid string, but optional
  title: z.string().min(3),
  desc: z.string().min(10),
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
      id: '', // Changed undefined to an empty string
      title: '',
      desc: '',
      status: TaskStatus.TODO,
    },
  });

  useEffect(() => {
    const taskData = tasks?.find((task) => task.id === taskId);
    if (taskData) {
      reset({
        id: taskData.id,
        title: taskData.title,
        desc: taskData.desc,
        status: taskData.status,
      });
    } else {
      reset({ id: '', title: '', desc: '', status: TaskStatus.TODO });
    }
  }, [taskId, tasks, reset]);

  const onSubmit = (data: TaskFormData) => {
    const updatedTasks = tasks ? [...tasks] : [];
    if (taskId) {
      const index = updatedTasks.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        updatedTasks[index] = { ...updatedTasks[index], ...data };
      } else {
        console.error('Task not found');
      }
    } else {
      const newTask: Task = { ...data, id: uuidv4() }; // Generate a new UUID for new tasks
      updatedTasks.push(newTask);
    }
    setTasks(updatedTasks);
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
