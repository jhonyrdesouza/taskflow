import { ReactNode, createContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '../lib/axios';

export type Task = {
  cuid?: string;
  title: string;
  description?: string;
  priority?: string;
  completed?: boolean;
  dueAt?: string | null;
};

type TaskContext = {
  tasks: Task[];
  addTask: (values: Task) => void;
  deleteTask: (cuid: string) => void;
  completeTask: (cuid: string) => void;
};

export const TaskContext = createContext<TaskContext>({
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  completeTask: () => {},
});

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch tasks when the component is mounted
    const loadTasks = async () => {
      try {
        const response = await api.get('/task');
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    loadTasks();
  }, []); // Empty dependency array ensures this runs only once on mount

  const addTask = async (values: Task) => {
    try {
      const response = await api.post('/task', values);
      setTasks((prev) => [...prev, response.data.task]);
      toast.success('Tarefa adicionada!');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Erro ao adicionar tarefa.');
    }
  };

  const deleteTask = async (cuid: string) => {
    try {
      await api.delete(`/task/${cuid}`);
      setTasks((prev) => prev.filter((task) => task.cuid !== cuid));
      toast.success('Tarefa removida com sucesso!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Erro ao remover tarefa.');
    }
  };

  const completeTask = async (cuid: string) => {
    try {
      const response = await api.patch(`/task/${cuid}`, { completed: true });
      setTasks((prev) => prev.map((task) => (task.cuid === cuid ? response.data.task : task)));
      toast.success('Parabéns! Você concluiu uma tarefa.');
    } catch (error) {
      console.error('Error completing task:', error);
      toast.error('Erro ao completar tarefa.');
    }
  };

  return <TaskContext.Provider value={{ tasks, addTask, deleteTask, completeTask }}>{children}</TaskContext.Provider>;
};
