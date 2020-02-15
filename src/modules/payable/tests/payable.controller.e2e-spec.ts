import { Test } from '@nestjs/testing';
import { AppModule } from '../../app/app.module';
import { Connection } from 'typeorm';
import { TestUtil } from '../../app/utils/test.util';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TransactionPaymentMethodENUM } from '../../transaction/enum/transactionPaymentMethod.enum';
import { Transaction } from '../../transaction/transaction.entity';
import { PayableStatusENUM } from '../enum/payableStatus.enum';
import * as moment from 'moment';
import { Payable } from '../payable.entity';

describe('PayableController :: E2E', () => {
  let app: INestApplication;
  let database: TestUtil;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    database = new TestUtil(moduleRef.get<Connection>(Connection));

    app = moduleRef.createNestApplication();

    await app.init();
  });

  beforeEach(async () => {
    await database.cleanDatabase();
  });

  describe('listPayables', () => {
    describe('When make a request to /GET payable', () => {
      it('should return array of payables grouped by type', async () => {
        request(app.getHttpServer())
          .get(`/payable`)
          .expect(200)
          .expect({
            available: {
              balance: 0,
              items: [],
            },
            waiting_funds: {
              balance: 0,
              items: [],
            },
          });

        const data: any = [
          {
            description: 'iPhone X 128GB',
            paymentMethod: TransactionPaymentMethodENUM.credit_card,
            value: 2500,
            cardNumber: '5562 9445 8620 0675',
            cardHolderName: 'Darwin Boaventura',
            cardExpirationDate: '11/2021',
            cardVerificationCode: '555',
          },
          {
            description: 'iPhone X 256GB',
            paymentMethod: TransactionPaymentMethodENUM.debit_card,
            value: 2500,
            cardNumber: '5562 9445 8620 0675',
            cardHolderName: 'Darwin Boaventura',
            cardExpirationDate: '11/2021',
            cardVerificationCode: '555',
          },
        ];

        const createdTransactionsRequests = [];

        for (const value of data) {
          createdTransactionsRequests.push(
            request(app.getHttpServer())
              .post('/transaction')
              .type('form')
              .send(value),
          );
        }

        await Promise.all(createdTransactionsRequests);

        const response = await request(app.getHttpServer()).get(`/payable`);

        expect(response.status).toBe(200);
        expect(response.body.available.balance).toBe(2500 - (3 / 2500) * 100);
        expect(response.body.waiting_funds.balance).toBe(2500 - (5 / 2500) * 100);
        expect(response.body.available.items.length).toBe(1);
        expect(response.body.waiting_funds.items.length).toBe(1);
      });
    });
  });

  describe('getPayableByTransactionId', () => {
    describe('When make a request to /GET payable/:transactionId', () => {
      it('should return transaction payable', async () => {
        request(app.getHttpServer())
          .get(`/payable/1`)
          .expect(200)
          .expect(undefined);

        const data: any = {
          transaction: {
            description: 'iPhone X 128GB',
            paymentMethod: TransactionPaymentMethodENUM.credit_card,
            value: 2500,
            cardNumber: '5562 9445 8620 0675',
            cardHolderName: 'Darwin Boaventura',
            cardExpirationDate: '11/2021',
            cardVerificationCode: '555',
          },
          payable: {},
        };

        const createTransactionResponse = await request(app.getHttpServer())
          .post('/transaction')
          .type('form')
          .send(data.transaction);

        const createdTransaction: Transaction = createTransactionResponse.body;

        expect(createTransactionResponse.status).toBe(201);
        expect(createdTransaction).toMatchObject(
          Object.assign({}, data.transaction, {
            cardNumber: '0675',
          }),
        );

        data.payable = {
          transaction: createdTransaction,
          transactionValue: createdTransaction.value,
          status: PayableStatusENUM.waiting_funds,
          expectedPaymentDate: moment(createdTransaction.createdAt)
            .add(30, 'days')
            .format('YYYY-MM-DD'),
          paidValue: createdTransaction.value - (5 / createdTransaction.value) * 100,
        };

        const getPayableResponse = await request(app.getHttpServer()).get(`/payable/${createdTransaction.id}`);
        const createdPayable: Payable = getPayableResponse.body;

        expect(createdPayable.paidValue).toBe(data.payable.paidValue);
        expect(createdPayable.paidValue).toBe(data.payable.paidValue);
        expect(createdPayable.status).toBe(PayableStatusENUM.waiting_funds);
        expect(createdPayable.expectedPaymentDate).toBe(data.payable.expectedPaymentDate);
      });
    });
  });

  afterAll(async () => {
    await database.cleanDatabase();
    await database.closeConnection();
    await app.close();
  });
});
