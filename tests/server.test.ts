import request from 'supertest';
import app from '../src/server';

describe('Test base route', () => {
  it('Should return 200 response code for base route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  })
});
