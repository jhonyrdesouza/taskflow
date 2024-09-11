import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/domain/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/domain/guards/jwt-auth.guard';
import { UserTranstormer } from 'src/domain/transformers/user.transformer';
import { UserService } from 'src/services/user.service';

@Controller({ path: 'user', version: '1' })
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiSecurity('bearer')
  @ApiOperation({
    summary: 'Obtém as informações do usuário autenticado.',
    description:
      'Este endpoint retorna as informações do usuário atualmente autenticado. O usuário deve estar autenticado e fornecer um token JWT válido. Retorna os detalhes do usuário autenticado no formato especificado.',
  })
  async me(@GetCurrentUser() cuid: string) {
    const res = await this.userService.me(cuid);
    const user = UserTranstormer.toUser(res);

    return { user };
  }
}
