import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<HttpException> implements ExceptionFilter {
  private readonly LOGGER = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const req = context.getRequest<Request>();
    const res = context.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;
    this.LOGGER.error(`Status ${status} -> Error: ${JSON.stringify(message)}`);
    return res.status(status).json({
      timestamp: new Date().toISOString(),
      status: status,
      message: message['error'] ? message['error'] : message,
      path: req.url ? req.url : '/',
    });
  }
}
