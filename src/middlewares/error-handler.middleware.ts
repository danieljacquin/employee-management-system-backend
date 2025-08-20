import { NextFunction, Request, Response } from 'express';

import AppError from '../errors/app-error';

const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  return res.status(500).json({ error: 'internal server error' });
};

export default errorHandler;
