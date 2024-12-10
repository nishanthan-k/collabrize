export class CustomError extends Error {
  statusCode: number;
  data: any;
  constructor(message: string, statusCode: number = 500, data: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string = 'Validation error', data: any = null) {
    super(message, 400, data);
  }
}

export class DatabaseError extends CustomError {
  constructor(message: string = 'Database error') {
    super(message, 500);
  }
}
