import { Router, type Request, type Response } from 'express';

const router = Router();

// Add base route
router.get('/', (req: Request, res: Response) => {
  res.status(200).send('Healthy');
});

export default router;
