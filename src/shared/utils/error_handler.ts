class BaseError extends Error {
  statusCode: number;
  isOperational: boolean;
  constructor (description: any, name: string, statusCode: number, isOperational: boolean) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}
export enum ErrorTypes {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}
export enum SuccessTypes {
  SUCCESS = 'SUCCESS',
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
}
export const StatusCodeAndMessage = {
  SUCCESS: {
    statusCode: 200,
    message: 'Success'
  },
  CREATED: {
    statusCode: 201,
    message: 'Created'
  },
  ACCEPTED: {
    statusCode: 202,
    message: 'Accepted'
  },
  BAD_REQUEST: {
    statusCode: 400,
    message: 'Bad Request'
  },
  UNAUTHORIZED: {
    statusCode: 401,
    message: 'Unauthorized'
  },
  PAYMENT_REQUIRED: {
    statusCode: 402,
    message: 'Payment Required'
  },
  FORBIDDEN: {
    statusCode: 403,
    message: 'Forbidden'
  },
  NOT_FOUND: {
    statusCode: 404,
    message: 'Not Found'
  },
  METHOD_NOT_ALLOWED: {
    statusCode: 405,
    message: 'Method Not Allowed'
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: 'Internal Server Error'
  }
} as { [key: string]: { statusCode: number, message: string } };

export const ErrorHandler = Object.keys(StatusCodeAndMessage).reduce((acc, key) => {
  acc[key] = (description: any) => new BaseError(description, StatusCodeAndMessage[key].message, StatusCodeAndMessage[key].statusCode, true);
  return acc;
}, {}) as { [key in ErrorTypes]: (description: any) => BaseError };
