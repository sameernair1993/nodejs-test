import { Router } from 'express';
import { getPosts, addPost, putPost } from './post.controller';
import { validateCreateRequest, validateUpdateRequest } from '../../middlewares/post.middleware';

const router = Router();

router.get('/', getPosts);
router.post('/', validateCreateRequest, addPost);
router.put('/', validateUpdateRequest, putPost);

export default router;
