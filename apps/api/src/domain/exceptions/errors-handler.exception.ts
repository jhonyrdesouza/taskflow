import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistsException extends HttpException {
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

export class InvalidCredentialsException extends HttpException {
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

export class EntityNotFoundException extends HttpException {
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

export class UnauthorizedException extends HttpException {
  constructor() {
    super(
      {
        error: 'Não Autorizado',
        message: 'Não autorizado porque você não tem as permissões',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class EmptyListException extends HttpException {
  constructor() {
    super(
      {
        error: 'Lista vazia',
        message: 'A lista está vazia no momento',
      },
      HttpStatus.LENGTH_REQUIRED,
    );
  }
}

export class TaskNameAlreadyUsedException extends HttpException {
  constructor() {
    super(
      {
        error: 'Conflito de Nome na Task',
        message: `Uma tarefa com este nome já existe`,
      },
      HttpStatus.CONFLICT,
    );
  }
}
