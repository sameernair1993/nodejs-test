import request from 'supertest';
import { type Express } from 'express';
import { getExpressApp } from '../src/server';
import { posts } from './data';
import * as postRepository from '../src/modules/post/post.repository';

describe('Testing post routes', () => {
  const app: Express = getExpressApp();

  it('Should return all the posts', async () => {
    const resolver: any = Promise.resolve(posts);
    jest.spyOn(postRepository, 'findAll').mockImplementation(jest.fn(() => resolver));
    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body.data?.length).toBeGreaterThanOrEqual(1);
  });

  it('Should create a post', async () => {
    const post = { title: 'Post3', content: 'About post 3', createdBy: 'sameer.nair@gmail.com' };
    const resolver: any = Promise.resolve(post);
    jest.spyOn(postRepository, 'create').mockImplementation(jest.fn(() => resolver));
    const response = await request(app).post('/api/posts').send(post);
    expect(response.status).toBe(201);
    expect(response.body?.data?.title).toBe(post.title);
  });

  it('Should throw an error if title is missing from request', async () => {
    const response = await request(app).post('/api/posts').send({ content: 'PS5', createdBy: 'sameer.nair@gmail.com' });
    expect(response.status).toBe(400);
  });

  it('Should throw an error if content is missing from request', async () => {
    const response = await request(app).post('/api/posts').send({ title: 'PS5', createdBy: 'sameer.nair@gmail.com' });
    expect(response.status).toBe(400);
  });

  it('Should throw an error if createdBy is missing from request', async () => {
    const response = await request(app).post('/api/posts').send({ title: 'PS5', content: 'Post about PS5' });
    expect(response.status).toBe(400);
  });

  it('Should throw a 422 error if post already exists', async () => {
    const existingPost = {
      dataValues: {
        ...posts[0]
      }
    };
    const resolver: any = Promise.resolve([existingPost]);
    jest.spyOn(postRepository, 'findByTitle').mockImplementation(jest.fn(() => resolver));
    const response = await request(app).post('/api/posts').send({
      title: posts[0].title,
      content: posts[0].content,
      createdBy: 'sameer.nair@gmail.com'
    });
    expect(response.status).toBe(422);
  });

  it('Should update a post', async () => {
    const post = {
      dataValues: { ...posts[0] }
    };
    const findByIdResolver: any = Promise.resolve([post]);
    jest.spyOn(postRepository, 'findById').mockImplementation(jest.fn(() => findByIdResolver));
    const updateResolver: any = Promise.resolve(true);
    jest.spyOn(postRepository, 'update').mockImplementation(jest.fn(() => updateResolver));
    const response = await request(app).put('/api/posts').send({
      id: posts[0].id,
      title: posts[0].title,
      content: posts[0].content,
      createdBy: 'sameer.nair@gmail.com'
    });
    expect(response.status).toBe(200);
  });

  it('Should throw an error if the post does not contain id', async () => {
    const response = await request(app).put('/api/posts').send({
      title: posts[0].title,
      content: posts[0].content,
      createdBy: 'sameer.nair@gmail.com'
    });
    expect(response.status).toBe(400);
  });

  it('Should throw an error if the post does not contain createdBy', async () => {
    const response = await request(app).put('/api/posts').send({
      id: posts[0].id,
      title: posts[0].title,
      content: posts[0].content
    });
    expect(response.status).toBe(400);
  });

  it('Should throw an error if another user is trying to update a different post', async () => {
    const post = {
      dataValues: { ...posts[0] }
    };
    const findByIdResolver: any = Promise.resolve([post]);
    jest.spyOn(postRepository, 'findById').mockImplementation(jest.fn(() => findByIdResolver));
    const response = await request(app).put('/api/posts').send({
      id: posts[0].id,
      title: posts[0].title,
      content: posts[0].content,
      createdBy: 'sameer.nair@yahoo.com'
    });
    expect(response.status).toBe(403);
  })

  it('Should delete a post', async () => {
    const post = {
      dataValues: { ...posts[0] }
    };
    const findByIdResolver: any = Promise.resolve([post]);
    jest.spyOn(postRepository, 'findById').mockImplementation(jest.fn(() => findByIdResolver));
    const response = await request(app).delete('/api/posts/123?createdBy=sameer.nair@gmail.com');
    expect(response.status).toBe(200);
  });

  it('Should throw an error if user is not the same as post owner', async () => {
    const post = {
      dataValues: { ...posts[0] }
    };
    const findByIdResolver: any = Promise.resolve([post]);
    jest.spyOn(postRepository, 'findById').mockImplementation(jest.fn(() => findByIdResolver));
    const response = await request(app).delete('/api/posts/123?createdBy=test@gmail.com');
    expect(response.status).toBe(403);
  });

  it('Should throw an error if post not found', async () => {
    const resolver: any = Promise.resolve([]);
    jest.spyOn(postRepository, 'findById').mockImplementation(jest.fn(() => resolver));
    const response = await request(app).delete("/api/posts/125?createdBy='sameer.nair@gmail.com'");
    expect(response.status).toBe(404);
  });
});
