import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TransformFnParams } from 'class-transformer/types/interfaces';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João da Silva',
  })
  @IsString({ message: 'O nome completo deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome completo não pode estar vazio.' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  fullname: string;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário, que será transformado para minúsculas',
    example: 'usuario@example.com',
  })
  @IsEmail({}, { message: 'O e-mail informado deve ser um endereço de e-mail válido.' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário, deve ter entre 6 e 12 caracteres',
    example: 'senha123',
  })
  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  @MaxLength(12, { message: 'A senha deve ter no máximo 12 caracteres.' })
  password: string;
}
