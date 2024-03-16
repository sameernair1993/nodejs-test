import { type Request, type Response, type NextFunction } from 'express';

export const validateCreateRequest = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  if (!body?.title?.length) {
    return res.status(400).json({ error: 'Request does not contain title' });
  }
  if (!body?.content?.length) {
    return res.status(400).json({ error: 'Request does not contain content' });
  }
  if (!body?.createdBy?.length) {
    return res.status(400).json({ error: 'Request does not contain createdBy field' });
  }
  next();
};

export const validateUpdateRequest = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  if (!body?.id || Number.isNaN(body.id)) {
    return res.status(400).json({ error: 'Post id is required for update' });
  }
  if (!body?.createdBy?.length) {
    return res.status(400).json({ error: 'CreatedBy field is required to identify the user associated with the post' });
  }
  if (!body?.title?.length && !body?.content?.length) {
    return res.status(400).json({ error: 'Title or content field is required for update' });
  }
  next();
};
