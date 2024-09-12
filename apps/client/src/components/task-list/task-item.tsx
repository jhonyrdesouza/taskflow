import { useContext } from 'react';
import { Task, TaskContext } from '../../contexts/task';
import { Check } from '../icons/check';
import { Trash } from '../icons/trash';
import { TaskItemStyled, ToggleButton, TrashButton, PriorityTag } from './styles';

type TaskItemProps = {
  task: Task;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  const { deleteTask, completeTask } = useContext(TaskContext);

  const handleDeleteTask = (cuid: string) => {
    if (cuid) {
      deleteTask(cuid);
    }
  };

  const handleCompleteTask = (cuid: string) => {
    if (cuid) {
      completeTask(cuid);
    }
  };

  return (
    <TaskItemStyled $isCompleted={task.completed}>
      <ToggleButton
        $isCompleted={task.completed}
        disabled={task.completed}
        onClick={() => handleCompleteTask(task.cuid!)}
      >
        <Check />
      </ToggleButton>
      <div>
        <h2>{task.title}</h2>
        {task.description && <p>{task.description}</p>}
        {task.priority && <PriorityTag $priority={task.priority}>{task.priority}</PriorityTag>}
      </div>
      <TrashButton onClick={() => handleDeleteTask(task.cuid!)}>
        <Trash />
      </TrashButton>
    </TaskItemStyled>
  );
};
