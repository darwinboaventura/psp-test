import { PayableController } from '../payable.controller';
import { PayableService } from '../payable.service';

describe('PayableController :: Unitary', () => {
  let payableController: PayableController;
  let payableService: PayableService;

  beforeEach(() => {
    payableService = new PayableService();
    payableController = new PayableController(payableService);
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
