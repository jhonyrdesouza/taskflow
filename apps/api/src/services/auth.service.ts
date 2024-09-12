import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { CreateAccountDto } from 'src/domain/dtos/create-account.dto';
import { LoginDto } from 'src/domain/dtos/login.dto';
import {
  EmailAlreadyExistsException,
  EntityNotFoundException,
  InvalidCredentialsException,
} from 'src/domain/exceptions/errors-handler.exception';
import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';
import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async register({ fullname, email, password }: CreateAccountDto) {
    const emailAlreadyExists = await this.userRepository.findUnique({ where: { email } });

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsException();
    }

    const passwordHashed = await this.bcryptService.hash(password);
    const gravatar = this.generateGravatarUrl(email);

    const user = await this.userRepository.create({
      data: {
        fullname,
        email,
        password: passwordHashed,
        avatar: gravatar,
      },
    });

    const token = await this.jwtService.encode(user);

    return { user, token };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findUnique({ where: { email } });

    if (!user) {
      throw new EntityNotFoundException();
    }

    const isPasswordValid = await this.bcryptService.compare(password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    const token = await this.jwtService.encode(user);

    return { user, token };
  }

  private generateGravatarUrl(email: string): string {
    const hash = createHash('md5').update(email).digest('hex');

    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
  }
}
