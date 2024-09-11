import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Endereço de e-mail do usuário para login',
    example: 'usuario@example.com',
  })
  @IsEmail({}, { message: 'O e-mail informado deve ser um endereço de e-mail válido.' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário para login',
    example: 'senha123',
  })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  password: string;
}
