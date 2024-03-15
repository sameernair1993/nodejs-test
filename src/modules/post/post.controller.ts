import { type Request, type Response, type NextFunction } from 'express';
import { listPosts, createPost } from './post.service';

export const getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await listPosts();
    res.status(200).json({ data: result });
  } catch (error) {
    console.log('Error fetching posts: ', error);
    next(error);
  }
};

export const addPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await createPost(req.body);
    res.status(201).json({ data: result });
  } catch (error) {
    console.log('Error creating post: ', error);
    next(error);
  }
}
