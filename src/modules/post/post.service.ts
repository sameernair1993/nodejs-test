import {
  findAll,
  create,
  findByTitle,
  update,
  findById,
  remove
} from './post.repository';
import { createErrorObject } from '../../entities/response/error.response';

export const listPosts = async () => {
  return await findAll();
}

export const createPost = async (data) => {
  const title: string = data.title;
  const [existingPost] = await findByTitle(title);
  if (existingPost?.dataValues?.id) {
    throw createErrorObject(`Post with title: ${title} exists`, 422);
  } else {
    return await create(data);
  }
}

export const updatePost = async (data) => {
  const postId: number = data.id;
  // Check if post exists with that id
  const [existingPost] = await findById(postId);
  const { dataValues } = existingPost || {};
  // Check if the post exists
  if (!dataValues?.id) {
    throw createErrorObject(`Post with id ${postId} does not exist`, 404);
  }
  // Check if the user is same.
  if (dataValues?.createdBy !== data.createdBy) {
    throw createErrorObject('You do not have the rights to modify this post', 403);
  }
  await update(data);
  return await findById(postId);
}

export const removePost = async (id: number, createdBy: string) => {
  const [post] = await findById(id);
  const { dataValues } = post || {};
  if (!dataValues?.id) {
    throw createErrorObject(`Post with id ${id} not found`, 404);
  }
  if (dataValues?.createdBy !== createdBy) {
    throw createErrorObject('You do not have the rights to delete this post', 403);
  }
  await remove(id);
}
