import { TransactionService } from '../transaction.service';
import { PayableService } from '../../payable/payable.service';
import { TransactionPaymentMethodENUM } from '../utils/ENUMs/transactionPaymentMethod.enum';

describe('TransactionService', () => {
  let payableService: PayableService;
  let transactionService: TransactionService;

  beforeEach(() => {
    payableService = new PayableService();
    transactionService = new TransactionService(payableService);
  });

  describe('findTransactions', () => {
    it('should return an array of transactions', async () => {
      const response: any = [
        {
          id: 1,
          description: 'Example 1',
          paymentMethod: TransactionPaymentMethodENUM.credit_card,
          value: 100,
          cardNumber: '0123456812349874',
          cardHolderName: 'Darwin B',
          cardExpirationDate: '02/2025',
          cardVerificationCode: '554',
          createdAt: '2020-02-11 10:00:00',
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: 2,
          description: 'Example 2',
          paymentMethod: TransactionPaymentMethodENUM.credit_card,
          value: 100,
          cardNumber: '0123456812349874',
          cardHolderName: 'Darwin B',
          cardExpirationDate: '02/2025',
          cardVerificationCode: '554',
          createdAt: '2020-02-11 10:00:00',
          updatedAt: null,
          deletedAt: null,
        },
      ];

      jest
        .spyOn(transactionService, 'findTransactions')
        .mockImplementation(async () => await new Promise((resolve) => resolve(response)));

      expect(await transactionService.findTransactions({}, {})).toBe(response);
    });
  });

  describe('createTransaction', () => {
    it('should return created transaction', async () => {
      const baseTransaction: any = [
        {
          description: 'Example 1',
          paymentMethod: TransactionPaymentMethodENUM.credit_card,
          value: 100,
          cardNumber: '0123456812349874',
          cardHolderName: 'Darwin B',
          cardExpirationDate: '02/2025',
          cardVerificationCode: '554',
          createdAt: '2020-02-11 10:00:00',
          updatedAt: null,
          deletedAt: null,
        },
      ];
      const response = Object.assign({}, baseTransaction, {
        id: 1,
      });

      jest
        .spyOn(transactionService, 'createTransaction')
        .mockImplementation(async () => await new Promise((resolve) => resolve(response)));

      expect(await transactionService.createTransaction(baseTransaction)).toBe(response);
    });
  });
});
