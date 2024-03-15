import { type CustomError } from '../contracts/custom-error.interface';

export const createErrorObject = (message: string, statusCode: number = 500): CustomError => {
  const error: CustomError = new Error(message);
  error.statusCode = statusCode;
  return error;
};
