/* eslint-disable @typescript-eslint/no-unsafe-argument */
import request from 'supertest';
import { type Express } from 'express';
import { Sequelize } from 'sequelize';
import { getExpressApp, setupRouter } from '../src/server';
import { connectToDatabase, synchronize } from '../src/database';

jest.mock('sequelize');

describe('Test base route', () => {
  let seqAuthenticateSpy: jest.SpyInstance;
  let seqSyncSpy: jest.SpyInstance;
  setupRouter();
  const app: Express = getExpressApp();

  beforeAll(() => {
    seqAuthenticateSpy = jest.spyOn(Sequelize.prototype, 'authenticate');
    seqSyncSpy = jest.spyOn(Sequelize.prototype, 'sync');
  });

  afterAll(() => {
    seqAuthenticateSpy.mockRestore();
    seqSyncSpy.mockRestore();
  });
  it('Should return 200 response code for base route', async () => {
    seqSyncSpy.mockResolvedValueOnce(true);
    seqAuthenticateSpy.mockResolvedValueOnce(true);
    await synchronize();
    await connectToDatabase();
    const response = await request(app).get('/api');
    expect(seqAuthenticateSpy).toHaveBeenCalled();
    expect(seqSyncSpy).toHaveBeenCalled();
    expect(response.statusCode).toBe(200);
  })
});
