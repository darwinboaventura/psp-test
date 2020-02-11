import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TransactionModule } from '../transaction.module';

describe('TransactionController :: E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TransactionModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET transaction', () => {
    return request(app.getHttpServer())
      .get('/transaction')
      .expect(200)
      .expect({
        data: [],
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
