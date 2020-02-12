import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../app/app.module';
import { Connection } from 'typeorm';
import { TestDatabaseUtil } from '../../app/utils/test/testDatabase.util';
import { TransactionPaymentMethodENUM } from '../utils/ENUMs/transactionPaymentMethod.enum';

describe('TransactionController :: E2E', () => {
  let app: INestApplication;
  let database: TestDatabaseUtil;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    database = new TestDatabaseUtil(moduleRef.get<Connection>(Connection));

    app = moduleRef.createNestApplication();

    await app.init();
  });

  beforeEach(async () => {
    await database.cleanDatabase();
  });

  describe('When make a request to /POST transaction', () => {
    describe('Passing a valid payload', () => {
      it('should create a transaction and return it', async () => {
        const data = {
          description: 'iPhone X 128GB',
          paymentMethod: TransactionPaymentMethodENUM.credit_card,
          value: 2500,
          cardNumber: '5177 6061 6786 4933',
          cardHolderName: 'Darwin Boaventura',
          cardExpirationDate: '11/2021',
          cardVerificationCode: '555',
        };

        const response = await request(app.getHttpServer())
          .post('/transaction')
          .type('form')
          .send(data);

        expect(response.status).toBe(201);
        expect(JSON.parse(response.text)).toMatchObject(data);
      });
    });
  });

  it('/GET transaction', () => {
    return request(app.getHttpServer())
      .get('/transaction')
      .expect(200)
      .expect([]);
  });

  afterAll(async () => {
    await app.close();
  });
});
