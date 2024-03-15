import { Router } from 'express';
import { getPosts, addPost } from './post.controller';
import { checkBody } from '../../middlewares/post.middleware';

const router = Router();

router.get('/', getPosts);
router.post('/', checkBody, addPost);

export default router;
