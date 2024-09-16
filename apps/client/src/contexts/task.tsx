import { AxiosError } from 'axios';
import nookies from 'nookies';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '../lib/axios';

export type Task = {
  cuid?: string;
  title: string;
  description?: string;
  priority?: string;
  completed?: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const cookies = nookies.get(null);
      const token = cookies['@taskflow.token'];
      setIsAuthenticated(!!token);
    };

    checkAuthentication();

    const loadTasks = async () => {
      if (!isAuthenticated) return;
      try {
        const response = await api.get('/task');
        setTasks(response.data.tasks);
      } catch (error) {
        handleApiError(error);
      }
    };

    loadTasks();
  }, [isAuthenticated]);

  const addTask = async (values: Task) => {
    if (!isAuthenticated) {
      toast.error('Você precisa estar autenticado para adicionar tarefas.');
      return;
    }

    try {
      const response = await api.post('/task', values);
      setTasks((prev) => [...prev, response.data.task]);
      toast.success('Tarefa adicionada!');
    } catch (error) {
      handleApiError(error);
    }
  };

  const deleteTask = async (cuid: string) => {
    if (!isAuthenticated) {
      toast.error('Você precisa estar autenticado para remover tarefas.');
      return;
    }

    try {
      await api.delete(`/task/${cuid}`);
      setTasks((prev) => prev.filter((task) => task.cuid !== cuid));
      toast.success('Tarefa removida com sucesso!');
    } catch (error) {
      handleApiError(error);
    }
  };

  const completeTask = async (cuid: string) => {
    if (!isAuthenticated) {
      toast.error('Você precisa estar autenticado para concluir tarefas.');
      return;
    }

    try {
      const response = await api.patch(`/task/${cuid}`, { completed: true });
      setTasks((prev) => prev.map((task) => (task.cuid === cuid ? response.data.task : task)));
      toast.success('Parabéns! Você concluiu uma tarefa.');
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error: unknown) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
        toast.error('Sua sessão expirou. Por favor, faça login novamente.');
      } else {
        toast.error('Erro na solicitação. Tente novamente mais tarde.');
      }
    } else {
      toast.error('Erro inesperado. Tente novamente mais tarde.');
    }
    console.error('API Error:', error);
  };

  return <TaskContext.Provider value={{ tasks, addTask, deleteTask, completeTask }}>{children}</TaskContext.Provider>;
};
