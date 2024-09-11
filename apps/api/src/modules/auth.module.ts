import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from 'src/controllers/auth.controller';
import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';
import { AuthService } from 'src/services/auth.service';
import { BcryptService } from 'src/services/bcrypt.service';
import { JwtModule } from './jwt.module';

@Module({
  controllers: [AuthController],
  imports: [JwtModule],
  providers: [UserRepository, JwtService, AuthService, BcryptService],
})
export class AuthModule {}
