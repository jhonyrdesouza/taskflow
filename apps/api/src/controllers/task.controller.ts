import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from '../domain/decorators/get-current-user.decorator';
import { CreateTaskDto } from '../domain/dtos/create-task.dto';
import { FiltersTaskDto } from '../domain/dtos/filters-task.dto';
import { UpdateTaskDto } from '../domain/dtos/update-task.dto';
import { JwtAuthGuard } from '../domain/guards/jwt-auth.guard';
import { TaskTransformer } from '../domain/transformers/task.transformer';
import { TaskService } from '../services/task.service';

@Controller({ path: 'task', version: '1' })
@ApiTags('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiSecurity('bearer')
  @ApiOperation({
    summary: 'Cria uma nova tarefa.',
    description:
      'Este endpoint permite que um usuário crie uma nova tarefa, desde que tenha a permissão CREATE. Retorna a tarefa criada.',
  })
  async create(@GetCurrentUser() userId: string, @Body() data: CreateTaskDto) {
    const res = await this.taskService.create(userId, data);

    const task = TaskTransformer.toTask(res);
    return { task };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiSecurity('bearer')
  @ApiOperation({
    summary: 'Obtém uma lista de todas as tarefas do usuário.',
    description:
      'Este endpoint retorna uma lista de tarefas filtradas pelo ID do usuário, com suporte a paginação (skip, take).',
  })
  async findAll(@GetCurrentUser() userId: string, @Query() filters: FiltersTaskDto) {
    const res = await this.taskService.findAll(userId, filters);

    const tasks = TaskTransformer.toTasks(res);
    return { tasks };
  }

  @Get(':cuid')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiSecurity('bearer')
  @ApiOperation({
    summary: 'Obtém uma tarefa específica pelo ID.',
    description:
      'Este endpoint retorna os detalhes de uma tarefa específica de um usuário, identificada pelo ID da tarefa (cuid).',
  })
  async findOne(@GetCurrentUser() userId: string, @Param('cuid') cuid: string) {
    const res = await this.taskService.findOne(userId, cuid);

    const task = TaskTransformer.toTask(res);
    return { task };
  }

  @Patch(':cuid')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiSecurity('bearer')
  @ApiOperation({
    summary: 'Atualiza uma tarefa existente.',
    description: 'Este endpoint permite que um usuário atualize uma tarefa existente. Retorna a tarefa atualizada.',
  })
  async update(@GetCurrentUser() userId: string, @Param('cuid') cuid: string, @Body() data: UpdateTaskDto) {
    const res = await this.taskService.update(userId, cuid, data);

    const task = TaskTransformer.toTask(res);
    return { task };
  }

  @Delete(':cuid')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiSecurity('bearer')
  @ApiOperation({
    summary: 'Remove uma tarefa.',
    description: 'Este endpoint permite que um usuário exclua uma tarefa específica. Retorna a tarefa removida.',
  })
  async remove(@GetCurrentUser() userId: string, @Param('cuid') cuid: string) {
    const res = await this.taskService.remove(userId, cuid);

    const task = TaskTransformer.toTask(res);
    return { task };
  }
}
