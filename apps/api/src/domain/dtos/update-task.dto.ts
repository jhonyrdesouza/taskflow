import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Indica se a tarefa está concluída',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'O campo "completed" deve ser um valor booleano.' })
  completed?: boolean;
}
