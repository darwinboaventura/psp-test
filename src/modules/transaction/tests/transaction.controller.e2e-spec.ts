import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import * as moment from 'moment';
import { AppModule } from '../../app/app.module';
import { Connection } from 'typeorm';
import { TestUtil } from '../../app/utils/test.util';
import { TransactionPaymentMethodENUM } from '../enum/transactionPaymentMethod.enum';
import { Transaction } from '../transaction.entity';
import { PayableStatusENUM } from '../../payable/enum/payableStatus.enum';
import { Payable } from '../../payable/payable.entity';

describe('TransactionController :: E2E', () => {
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

  describe('When make a request to /GET transaction', () => {
    it('should return array of transactions', async () => {
      let response;

      request(app.getHttpServer())
        .get(`/transaction`)
        .expect(200)
        .expect([]);

      const data = {
        description: 'iPhone X 128GB',
        paymentMethod: TransactionPaymentMethodENUM.credit_card,
        value: 2500,
        cardNumber: '5177 6061 6786 4933',
        cardHolderName: 'Darwin Boaventura',
        cardExpirationDate: '11/2021',
        cardVerificationCode: '555',
      };

      await request(app.getHttpServer())
        .post('/transaction')
        .type('form')
        .send(data)
        .expect(201);

      response = await request(app.getHttpServer()).get(`/transaction`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toMatchObject(
        Object.assign({}, data, {
          cardNumber: '4933',
        }),
      );

      await request(app.getHttpServer())
        .post('/transaction')
        .type('form')
        .send(
          Object.assign({}, data, {
            paymentMethod: TransactionPaymentMethodENUM.debit_card,
            description: 'iPhone 8 256GB',
          }),
        )
        .expect(201);

      response = await request(app.getHttpServer()).get(`/transaction`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[1]).toMatchObject(
        Object.assign({}, data, {
          paymentMethod: TransactionPaymentMethodENUM.debit_card,
          description: 'iPhone 8 256GB',
          cardNumber: '4933',
        }),
      );
    });
  });

  describe('When make a request to /POST transaction', () => {
    describe('Passing a valid payload', () => {
      it('should create a transaction and return it', async () => {
        const data: any = {
          transaction: {
            description: 'iPhone X 128GB',
            paymentMethod: TransactionPaymentMethodENUM.credit_card,
            value: 2500,
            cardNumber: '5177 6061 6786 4933',
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

        const createdTransaction: Transaction = JSON.parse(createTransactionResponse.text);

        expect(createTransactionResponse.status).toBe(201);
        expect(createdTransaction).toMatchObject(
          Object.assign({}, data.transaction, {
            cardNumber: '4933',
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
        const createdPayable: Payable = JSON.parse(getPayableResponse.text);

        expect(createdPayable.paidValue).toBe(data.payable.paidValue);
        expect(createdPayable.paidValue).toBe(data.payable.paidValue);
        expect(createdPayable.status).toBe(PayableStatusENUM.waiting_funds);
        expect(createdPayable.expectedPaymentDate).toBe(data.payable.expectedPaymentDate);
      });
    });

    describe('Passing an invalid payload', () => {
      it('should throw a validation error', async () => {
        const data = {
          description: 'Example wrong payload',
        };

        request(app.getHttpServer())
          .post('/transaction')
          .type('form')
          .send(data)
          .expect(500);
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
