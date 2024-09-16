import { ApiProperty } from '@nestjs/swagger';
import { Priority } from '@prisma/client';
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Concluir relatório do projeto',
  })
  @IsString({ message: 'O título da tarefa deve ser uma string.' })
  @IsNotEmpty({ message: 'O título da tarefa não pode estar vazio.' })
  title: string;

  @ApiProperty({
    description: 'Descrição opcional da tarefa',
    example: 'Esta tarefa envolve a compilação do relatório final do projeto.',
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Nível de prioridade da tarefa',
    enum: Priority,
    example: Priority.MEDIUM,
    required: false,
  })
  @IsOptional()
  @IsEnum(Priority, { message: 'O valor da prioridade deve ser um dos valores válidos: ALTA, MÉDIA ou BAIXA.' })
  priority?: Priority;

  @ApiProperty({
    description: 'Indica se a tarefa está concluída',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'O campo "completed" deve ser um valor booleano.' })
  completed?: boolean;

  cuid?: string;
}
