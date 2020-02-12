import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import * as moment from 'moment';
import { AppModule } from '../../app/app.module';
import { Connection } from 'typeorm';
import { TestDatabaseUtil } from '../../app/utils/test/testDatabase.util';
import { TransactionPaymentMethodENUM } from '../utils/ENUMs/transactionPaymentMethod.enum';
import { Transaction } from '../transaction.entity';
import { PayableStatusENUM } from '../../payable/utils/ENUMs/payableStatus.enum';
import { Payable } from '../../payable/payable.entity';

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
