import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Permission, Task } from '@prisma/client';
import { Cache } from 'cache-manager';
import { CreateTaskDto } from 'src/domain/dtos/create-task.dto';
import { FiltersTaskDto } from 'src/domain/dtos/filters-task.dto';
import { UpdateTaskDto } from 'src/domain/dtos/update-task.dto';
import {
  EntityNotFoundException,
  TaskNameAlreadyUsedException,
  UnauthorizedException,
} from 'src/domain/exceptions/errors-handler.exception';
import { TaskRepository } from 'src/infrastructure/database/repositories/task.repository';
import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';

@Injectable()
export class TaskService {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(userId: string, { title, description, completed, priority, dueAt }: CreateTaskDto): Promise<Task> {
    const user = await this.userRepository.findUnique({ where: { cuid: userId } });

    if (!user) {
      throw new EntityNotFoundException();
    }

    if (!user.permissions.includes(Permission.CREATE)) {
      throw new UnauthorizedException();
    }

    const existingTask = await this.taskRepository.findUnique({ where: { title } });

    if (existingTask) {
      throw new TaskNameAlreadyUsedException();
    }

    return await this.taskRepository.create({
      data: { title, description, completed, priority, dueAt, user: { connect: { cuid: userId } } },
    });
  }

  async findAll(userId: string, { skip, take }: FiltersTaskDto): Promise<Task[]> {
    const cached = await this.cache.get<Task[]>('find.all.' + userId);

    if (cached) {
      return cached;
    }

    const tasks = await this.taskRepository.findMany({
      where: { userId },
      skip,
      take,
    });

    await this.cache.set('find.all.' + userId, tasks);

    return tasks;
  }

  async findOne(userId: string, cuid: string): Promise<Task> {
    const existingTask = await this.taskRepository.findUnique({ where: { cuid, userId } });

    if (!existingTask) {
      throw new EntityNotFoundException();
    }

    return existingTask;
  }

  async update(userId: string, cuid: string, { completed }: UpdateTaskDto) {
    const existingTask = await this.taskRepository.findUnique({ where: { cuid, userId } });

    if (!existingTask) {
      throw new EntityNotFoundException();
    }

    return await this.taskRepository.update({
      where: { cuid },
      data: { completed },
    });
  }

  async remove(userId: string, cuid: string): Promise<Task> {
    const existingTask = await this.taskRepository.findUnique({ where: { cuid, userId } });

    if (!existingTask) {
      throw new EntityNotFoundException();
    }

    return await this.taskRepository.delete({ where: { cuid } });
  }
}
