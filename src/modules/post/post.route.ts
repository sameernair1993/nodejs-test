import { Router } from 'express';
import { getPosts, addPost, putPost, deletePost } from './post.controller';
import { validateCreateRequest, validateUpdateRequest, validateDeleteRequest } from '../../middlewares/post.middleware';

const router = Router();

router.get('/', getPosts);
router.post('/', validateCreateRequest, addPost);
router.put('/', validateUpdateRequest, putPost);
router.delete('/:postId', validateDeleteRequest, deletePost);

export default router;
