import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {

    console.log("@@ excep",exception)
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: { field:string, errors:String[] }[] = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const res: any = exception.getResponse();

      if (res?.errors) {
        message = res.message || 'Validation failed';
        errors = res.errors;
      }

      else if (Array.isArray(res?.message)) {
        message = 'Validation failed';
        errors = res.message;
      }

      else if (typeof res?.message === 'string') {
        message = res.message;
      }
    }

    response.status(status).json({
      success: false,
      message,
      errors
    });
  }
}