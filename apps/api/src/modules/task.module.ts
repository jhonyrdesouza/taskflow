import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TaskController } from 'src/controllers/task.controller';
import { TaskRepository } from 'src/infrastructure/database/repositories/task.repository';
import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';
import { TaskService } from 'src/services/task.service';

@Module({
  controllers: [TaskController],
  providers: [UserRepository, TaskRepository, TaskService, JwtService],
})
export class TaskModule {}
