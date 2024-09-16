import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const status = exception.getStatus();
    const response = context.getResponse<Response>();

    const error = exception.response.error;
    const message = exception instanceof Error ? exception.message : (exception.response.error ?? exception);

    this.logger.error(exception);

    response.status(status).json({
      status,
      success: false,
      error: status === HttpStatus.INTERNAL_SERVER_ERROR ? 'Technical Problems' : (error ?? 'Error'),
      message: status === HttpStatus.INTERNAL_SERVER_ERROR ? 'Sorry we are experiencing technical problems' : message,
      fields: exception.response?.fields ? exception.response.fields : undefined,
      timestamp: new Date().toISOString(),
    });
  }
}
