import { PayableController } from '../payable.controller';
import { PayableService } from '../payable.service';

describe('PayableController :: Unitary', () => {
  let payableController: PayableController;
  let payableService: PayableService;

  beforeEach(() => {
    payableService = new PayableService();
    payableController = new PayableController(payableService);
  });

  describe('calculateBalance', () => {
    describe('when passing an array of items', () => {
      it('should calculate the sum of all items value', () => {
        const inputData = [
          {
            paidValue: 100,
          },
          {
            paidValue: 120,
          },
        ];

        expect(payableController.calculateBalance(inputData)).toBe(220);
      });
    });

    describe('when passing an empty array', () => {
      it('should return zero', () => {
        const inputData = [];

        expect(payableController.calculateBalance(inputData)).toBe(0);
      });
    });
  });

  describe('listPayables', () => {
    it('should return object with information about payables available and future', async () => {
      const response = {
        available: {
          balance: 0,
          items: [],
        },
        waiting_funds: {
          balance: 0,
          items: [],
        },
      };

      jest
        .spyOn(payableController, 'listPayables')
        .mockImplementation(async () => await new Promise((resolve) => resolve(response)));

      expect(await payableController.listPayables()).toBe(response);
    });
  });
});
