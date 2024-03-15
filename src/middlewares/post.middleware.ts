import { type Request, type Response, type NextFunction } from 'express';

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  if (!body?.title?.length || !body?.content?.length) {
    return res.status(400).json({ message: 'Request does not contain title or content' });
  }
  next();
};
