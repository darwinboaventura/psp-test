import { TransactionService } from '../transaction.service';
import { TransactionController } from '../transaction.controller';
import { PayableService } from '../../payable/payable.service';
import { TransactionPaymentMethodENUM } from '../enum/transactionPaymentMethod.enum';

describe('TransactionController :: Unitary', () => {
  let payableService: PayableService;
  let transactionController: TransactionController;
  let transactionService: TransactionService;

  beforeEach(() => {
    payableService = new PayableService();
    transactionService = new TransactionService(payableService);
    transactionController = new TransactionController(transactionService);
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
        .spyOn(transactionController, 'listTransactions')
        .mockImplementation(async () => await new Promise((resolve) => resolve(response)));

      expect(await transactionController.listTransactions({})).toBe(response);
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
        .spyOn(transactionController, 'createTransaction')
        .mockImplementation(async () => await new Promise((resolve) => resolve(response)));

      expect(await transactionController.createTransaction(baseTransaction)).toBe(response);
    });
  });
});
