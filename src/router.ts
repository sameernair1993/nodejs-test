import { Router, type Request, type Response } from 'express';
import postRouter from './modules/post/post.route';

const router = Router();

// Add base route
router.get('/', (req: Request, res: Response) => {
  res.status(200).send('Healthy');
});

router.use('/posts', postRouter);

export default router;
