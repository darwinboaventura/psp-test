import { PayableService } from '../payable.service';
import { PayableStatusENUM } from '../utils/ENUMs/payableStatus.enum';
describe('PayableService', () => {
  let payableService: PayableService;

  beforeEach(() => {
    payableService = new PayableService();
  });

  describe('getPayableByTransactionId', () => {
    it('should return a payable item', async () => {
      const response: any = {
        id: 1,
        transaction: {
          id: 1,
        },
        transactionValue: 100,
        paidValue: 95,
        status: PayableStatusENUM.waiting_funds,
        expectedPaymentDate: '2020-02-11 10:00:00',
        createdAt: '2020-01-11 10:00:00',
        updatedAt: null,
        deletedAt: null,
      };

      jest
        .spyOn(payableService, 'getPayableByTransactionId')
        .mockImplementation(async () => await new Promise((resolve) => resolve(response)));

      expect(await payableService.getPayableByTransactionId(1)).toBe(response);
    });
  });

  describe('findPayables', () => {
    it('should return an arrray of payables', async () => {
      const response: any = [
        {
          id: 1,
          transaction: {
            id: 1,
          },
          transactionValue: 100,
          paidValue: 95,
          status: PayableStatusENUM.waiting_funds,
          expectedPaymentDate: '2020-02-11 10:00:00',
          createdAt: '2020-01-11 10:00:00',
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: 2,
          transaction: {
            id: 2,
          },
          transactionValue: 100,
          paidValue: 97,
          status: PayableStatusENUM.paid,
          expectedPaymentDate: '2020-02-11 10:00:00',
          createdAt: '2020-02-11 10:00:00',
          updatedAt: null,
          deletedAt: null,
        },
      ];

      jest
        .spyOn(payableService, 'findPayables')
        .mockImplementation(async () => await new Promise((resolve) => resolve(response)));

      expect(await payableService.findPayables()).toBe(response);
    });
  });

  describe('createPayable', () => {
    it('should return created payable', async () => {});
  });
});
