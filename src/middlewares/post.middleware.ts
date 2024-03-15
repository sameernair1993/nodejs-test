import { type Request, type Response, type NextFunction } from 'express';

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  if (!body?.title?.length) {
    return res.status(400).json({ message: 'Request does not contain title' });
  }
  if (!body?.content?.length) {
    return res.status(400).json({ message: 'Request does not contain content' });
  }
  if (!body?.createdBy?.length) {
    return res.status(400).json({ message: 'Request does not contain createdBy field' });
  }
  next();
};
