import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from 'src/domain/dtos/create-account.dto';
import { LoginDto } from 'src/domain/dtos/login.dto';
import { UserTranstormer } from 'src/domain/transformers/user.transformer';
import { AuthService } from 'src/services/auth.service';

@Controller({ path: 'auth', version: '1' })
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registra um novo usuário.',
    description:
      'Este endpoint é utilizado para criar uma nova conta de usuário no sistema. Recebe as informações do usuário e retorna os detalhes do usuário criado juntamente com um token de autenticação.',
  })
  async register(@Body() data: CreateAccountDto) {
    const { user, token } = await this.authService.register(data);

    const res = UserTranstormer.toUser(user);
    return { user: res, token };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Realiza o login de um usuário.',
    description:
      'Este endpoint é utilizado para autenticar um usuário existente no sistema. Recebe as credenciais de login e retorna os detalhes do usuário autenticado juntamente com um token de autenticação.',
  })
  async login(@Body() data: LoginDto) {
    const { user, token } = await this.authService.login(data);

    const res = UserTranstormer.toUser(user);
    return { user: res, token };
  }
}
