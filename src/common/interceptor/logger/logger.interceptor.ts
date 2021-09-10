import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const path = `${context.getArgs()[0].route.path}`;
    const method = `${context.getArgs()[0].route.stack[0].method}`;
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    return next.handle().pipe(
      tap(() => {
        Logger.log(
          `${request.ip} » ${path} » ${method.toUpperCase()} » ${request.get(
            'user-agent',
          )}`,
          LoggerInterceptor.name,
        );
      }),
    );
  }
}
