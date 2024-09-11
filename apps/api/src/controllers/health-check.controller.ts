import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { PrismaHealthCheckIndicator } from 'src/services/health-check.service';

@Controller({ path: 'health-check', version: '1' })
@ApiTags('health check')
export class HealthCheckController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly prismaHealthCheckIndicator: PrismaHealthCheckIndicator,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Verifica o status de saúde do sistema.',
    description:
      'Este endpoint é utilizado para monitorar a disponibilidade e o funcionamento adequado da aplicação. Ele retorna uma resposta indicando se o sistema está operacional e pronto para receber requisições. Pode ser utilizado por ferramentas de monitoramento para verificar a saúde da aplicação em tempo real.',
  })
  @HealthCheck()
  check() {
    return this.healthCheckService.check([() => this.prismaHealthCheckIndicator.isHealthy('database')]);
  }
}
