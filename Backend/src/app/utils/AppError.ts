export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    stack?: string,
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.message = message;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
