class ApiResponse {
  private statusCode: number;
  private data: {} | null;
  private message: string;
  private success: boolean;
  constructor(
    statusCode: number,
    data: {} | null,
    message: string = "success"
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

class ApiError extends Error {
  private statusCode: number;
  private errors: [];
  private success: boolean;
  constructor(
    statusCode: number,
    message: string = "something went wrong",
    errors: [] = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    // this.data = null;`
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiResponse, ApiError };
