import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Priority } from '@prisma/client';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'Título da tarefa. Este campo é opcional ao atualizar uma tarefa.',
    example: 'Atualizar relatório financeiro',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'Descrição opcional da tarefa. Este campo é opcional ao atualizar uma tarefa.',
    example: 'Esta tarefa envolve a atualização do relatório financeiro com os dados mais recentes.',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Nível de prioridade da tarefa. Este campo é opcional ao atualizar uma tarefa.',
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
    example: 'LOW',
    required: false,
  })
  priority?: Priority;

  @ApiProperty({
    description: 'Indica se a tarefa está concluída. Este campo é opcional ao atualizar uma tarefa.',
    example: true,
    required: false,
  })
  completed?: boolean;

  @ApiProperty({
    description: 'Data de vencimento da tarefa no formato ISO 8601. Este campo é opcional ao atualizar uma tarefa.',
    example: '2024-12-31T23:59:59Z',
    required: false,
  })
  dueAt?: Date;
}
