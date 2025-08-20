class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
  ) {
    super(message);
  }

  static badRequest(message: string) {
    return new AppError(message, 400);
  }

  static internalServer(message: string) {
    return new AppError(message, 500);
  }
}

export default AppError;
