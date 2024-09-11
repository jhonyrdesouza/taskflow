import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { EntityNotFound } from 'src/domain/exceptions/errors-handler.exception';
import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async me(cuid: string): Promise<User> {
    const user = await this.userRepository.findUnique({ where: { cuid } });

    if (!user) {
      throw new EntityNotFound();
    }

    return user;
  }
}
