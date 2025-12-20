import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();
    const correlationId = request.headers['x-correlation-id'] || `req-${now}`;

    // Add correlation ID to request
    request.correlationId = correlationId;

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const delay = Date.now() - now;
        console.log({
          correlationId,
          method,
          url,
          statusCode: response.statusCode,
          delay: `${delay}ms`,
        });
      }),
    );
  }
}


