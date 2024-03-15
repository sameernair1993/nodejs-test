import { type Request, type Response, type NextFunction } from 'express';
import { type CustomError } from '../entities/contracts/custom-error.interface';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  } else {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
