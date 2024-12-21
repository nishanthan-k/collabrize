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

export class UserAlreadyExistsError extends CustomError {
  constructor(message: string = 'User already exists') {
    super(message, 409); // 409 Conflict
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 401); // 401 Unauthorized
  }
}

export class JwtError extends CustomError {
  constructor(message: string = 'JWT Error') {
    super(message, 401); // 401 Unauthorized
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string = 'Forbidden: No access to this resource') {
    super(message, 403); // 403 Forbidden
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string = 'Bad Request') {
    super(message, 400); // 400 Bad Request
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500); // 500 Internal Server Error
  }
}

export class NotImplementedError extends CustomError {
  constructor(message: string = 'Not Implemented') {
    super(message, 501); // 501 Not Implemented
  }
}

export class ServiceUnavailableError extends CustomError {
  constructor(message: string = 'Service Unavailable') {
    super(message, 503); // 503 Service Unavailable
  }
}
