import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.contraoller';
import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';
import { UserService } from 'src/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from './jwt.module';

@Module({
  controllers: [UserController],
  imports: [JwtModule],
  providers: [UserRepository, UserService, JwtService],
})
export class UserModule {}
