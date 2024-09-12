import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const now = Date.now();

    const request = context.switchToHttp().getRequest();
    const { method, path, user, body, query, params } = request;

    const log = {
      method,
      path,
      data: { body, query, params },
      by: user?.user,
      timestamp: new Date().toISOString(),
    };

    this.logger.debug(`Incoming Request on: ${JSON.stringify(log)}`);

    return next.handle().pipe(
      tap({
        next: () => this.logger.log(`End request for in ${Date.now() - now}ms`),
        error: (error) =>
          this.logger.error(
            `Error in Request: ${JSON.stringify({
              ...log,
              error: { stack: error.stack },
            })}`,
          ),
      }),
    );
  }
}
