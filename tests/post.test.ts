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
    const post = { title: 'Post3', content: 'About post 3' };
    const resolver: any = Promise.resolve(post);
    jest.spyOn(postRepository, 'create').mockImplementation(jest.fn(() => resolver));
    const response = await request(app).post('/api/posts').send(post);
    expect(response.status).toBe(201);
    expect(response.body?.data?.title).toBe(post.title);
  });

  it('Should throw a 422 error if post already exists', async () => {
    const resolver: any = Promise.resolve(posts[0]);
    jest.spyOn(postRepository, 'create').mockImplementation(jest.fn(() => resolver));
    const response = await request(app).post('/api/posts').send({ title: posts[0].title, content: posts[0].content });
    expect(response.status).toBe(422);
  });
});
