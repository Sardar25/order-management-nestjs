export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;

  constructor(success: boolean, message: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success<T>(data: T, message = 'Request successful') {
    return new ApiResponse<T>(true, message, data);
  }

  static created<T>(data: T, message = 'Resource created successfully') {
    return new ApiResponse<T>(true, message, data);
  }

  static empty(message = 'No data') {
    return new ApiResponse<null>(true, message, null);
  }
}