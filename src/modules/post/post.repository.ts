import { Post } from '../../models';

export const findAll = async () => {
  return await Post.findAll();
}

export const create = async (data) => {
  return await Post.create({
    title: data.title,
    content: data.content,
    createdBy: data.createdBy
  });
}

export const findByTitle = async (title: string) => {
  return await Post.findAll({
    where: { title }
  });
}

export const update = async (data) => {
  return await Post.update({ title: data.title, content: data.content }, {
    where: {
      id: data.id,
      createdBy: data.createdBy
    }
  });
}

export const findById = async (id: number) => {
  return await Post.findAll({
    where: { id }
  });
}
