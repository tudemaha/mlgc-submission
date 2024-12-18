import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class CustomResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => {
        if (request.method == 'POST') {
          return {
            status: 'success',
            message: 'Model is predicted successfully',
            data,
          };
        } else {
          return {
            status: 'success',
            data,
          };
        }
      }),
    );
  }
}
