import { findAll, create, findByTitle } from './post.repository';
import { createErrorObject } from '../../entities/response/error.response';

export const listPosts = async () => {
  return await findAll();
};

export const createPost = async (data) => {
  const title: string = data.title;
  const [existingPost] = await findByTitle(title);
  if (existingPost?.dataValues?.id) {
    throw createErrorObject(`Post with title: ${title} exists`, 422);
  } else {
    return await create(data);
  }
}
