import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaInstance } from 'src/infrastructure/database/prisma-instance.database';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaInstance) {}

  private task = this.prisma.task;

  async create(params: { data: Prisma.TaskCreateInput }): Promise<Task> {
    const { data } = params;

    return this.task.create({ data });
  }

  async findUnique(params: { where: Prisma.TaskWhereUniqueInput }): Promise<Task | null> {
    const { where } = params;

    return this.task.findUnique({ where });
  }

  async findByTitle(params: { where: Prisma.TaskWhereInput }): Promise<Task | null> {
    const { where } = params;

    return this.task.findFirst({ where });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
  }): Promise<Task[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.task.findMany({ skip, take, cursor, where, orderBy });
  }

  async update(params: { where: Prisma.TaskWhereUniqueInput; data: Prisma.TaskUpdateInput }): Promise<Task> {
    const { where, data } = params;

    return this.task.update({ where, data });
  }

  async delete(params: { where: Prisma.TaskWhereUniqueInput }): Promise<Task> {
    const { where } = params;

    return this.task.delete({ where });
  }
}
