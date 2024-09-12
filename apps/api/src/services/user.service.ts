import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Cache } from 'cache-manager';
import { EntityNotFoundException } from 'src/domain/exceptions/errors-handler.exception';
import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    private readonly userRepository: UserRepository,
  ) {}

  async me(cuid: string): Promise<User> {
    const cached = await this.cache.get<User>('get.me.' + cuid);

    if (cached) {
      return cached;
    }

    const user = await this.userRepository.findUnique({ where: { cuid } });

    if (!user) {
      throw new EntityNotFoundException();
    }

    await this.cache.set('get.me.' + cuid, user);

    return user;
  }
}
