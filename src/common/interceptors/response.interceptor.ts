import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../dto/api-response.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((response) => {
        if (response instanceof ApiResponse) {
          return response;
        }

        if (response?.data !== undefined) {
          return {
            success: true,
            message: response.message ?? 'Request successful',
            data: response.data
          };
        }

        return {
          success: true,
          message: 'Request successful',
          data: response
        };
      })
    );
  }
}