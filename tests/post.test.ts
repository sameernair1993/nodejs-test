import request from 'supertest';
import { type Express } from 'express';
import { getExpressApp, setupRouter } from '../src/server';
import { posts } from './data';

describe('Testing post routes', () => {
  setupRouter();
  const app: Express = getExpressApp();

  it('Should return all the posts', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body.data).toBe(posts);
  });

  it('Should create a post', async () => {
    const response = await request(app).post('/api/posts').send({ title: 'Post2', content: 'About post 2' });
    expect(response.status).toBe(201);
  });
});
