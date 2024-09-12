import { Task } from '@prisma/client';

export class TaskTransformer {
  static toTask(task: Task) {
    return {
      cuid: task.cuid,
      title: task.title,
      description: task.description,
      priority: task.priority,
      completed: task.completed,
      dueAt: task.dueAt,
    };
  }

  static toTasks(tasks: Task[]) {
    return tasks.map(this.toTask);
  }
}
