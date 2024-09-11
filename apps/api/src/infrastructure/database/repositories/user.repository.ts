import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaInstance } from 'src/infrastructure/database/prisma-instance.database';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaInstance) {}

  private user = this.prisma.user;

  async create(params: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = params;

    return this.user.create({ data });
  }

  async findUnique(params: { where: Prisma.UserWhereUniqueInput }): Promise<User | null> {
    const { where } = params;

    return this.user.findUnique({ where });
  }
}
