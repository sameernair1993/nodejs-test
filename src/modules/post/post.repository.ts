import { Post } from '../../models';

export const findAll = async () => {
  return await Post.findAll();
};

export const create = async (data) => {
  return await Post.create({
    title: data.title,
    content: data.content,
    createdBy: data.createdBy
  });
};

export const findByTitle = async (title: string) => {
  return await Post.findAll({
    where: { title }
  });
};
