import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TaskContext } from '../../contexts/task';
import { Plus } from '../icons/plus';
import { Button, Form, Input, Textarea, Select } from './styles';

const formSchema = z.object({
  title: z.string().min(2, 'Mínimo de 2 caracteres').max(50, 'Máximo de 50 caracteres'),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  dueAt: z.string().nullable().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const { register, handleSubmit, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'LOW',
      dueAt: null,
    },
  });

  const onSubmit = (values: FormSchema) => {
    addTask(values);

    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('title')} placeholder="Título da tarefa" />
      <Textarea {...register('description')} placeholder="Descrição (opcional)" />
      <Select {...register('priority')}>
        <option value="LOW">Baixa</option>
        <option value="MEDIUM">Média</option>
        <option value="HIGH">Alta</option>
      </Select>
      <Input type="date" {...register('dueAt')} placeholder="Data de vencimento (opcional)" />
      <Button type="submit">
        Criar
        <Plus />
      </Button>
    </Form>
  );
};
