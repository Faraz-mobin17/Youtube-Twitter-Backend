class ApiError extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly data: any;
  public readonly success: boolean;
  public readonly errors: any[];
  constructor(
    statusCode: number,
    message = "something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export { ApiError };
