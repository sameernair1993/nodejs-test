import request from 'supertest';
import { type Express } from 'express';
import { getExpressApp, setupRouter } from '../src/server';
import { posts } from './data';

describe('Testing post routes', () => {
  setupRouter();
  const app: Express = getExpressApp();

  it('Should return all the posts', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.statusCode).toBe(200);
    expect(response).toBe(posts);
  });
});
