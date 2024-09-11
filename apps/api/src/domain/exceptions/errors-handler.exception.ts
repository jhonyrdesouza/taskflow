import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExists extends HttpException {
  constructor() {
    super(
      {
        error: 'E-mail Já Existe',
        message: `O e-mailjá está sendo usado por outro usuário`,
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class InvalidCredentials extends HttpException {
  constructor() {
    super(
      {
        error: 'Credenciais Inválidas',
        message: 'Combinação de e-mail ou senha inválida',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class EntityNotFound extends HttpException {
  constructor() {
    super(
      {
        error: 'Entidade não encontrado(a)',
        message: `Desculpe, mas o que você procura não foi encontrado(a)`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
