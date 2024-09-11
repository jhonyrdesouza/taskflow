import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FiltersTaskDto {
  @ApiProperty({
    description: 'Ordenar tarefas de forma ascendente (asc) ou descendente (desc)',
    example: 'asc',
    required: false,
  })
  @IsString({ message: 'O campo "orderBy" deve ser uma string com valor "asc" ou "desc".' })
  @IsOptional()
  orderBy?: 'asc' | 'desc';

  @ApiProperty({
    description: 'Número de registros a serem ignorados (skip)',
    example: 10,
    required: false,
  })
  @IsNumber({}, { message: 'O campo "skip" deve ser um número.' })
  @IsOptional()
  @Transform(({ value }: { value: string }) => Number(value), { toClassOnly: true })
  skip?: number;

  @ApiProperty({
    description: 'Número de registros a serem retornados (take)',
    example: 20,
    required: false,
  })
  @IsNumber({}, { message: 'O campo "take" deve ser um número.' })
  @IsOptional()
  @Transform(({ value }: { value: string }) => Number(value), { toClassOnly: true })
  take?: number;
}
