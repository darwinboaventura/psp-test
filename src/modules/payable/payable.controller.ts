import * as _ from 'lodash';
import { Controller, Get } from '@nestjs/common';
import { PayableStatusENUM } from './utils/ENUMs';
import { PayableService } from './payable.service';

@Controller('payable')
export class PayableController {
  constructor(private readonly service: PayableService) {}

  calculateBalance(items) {
    let sum = 0;

    if (items) {
      sum =
        Number(
          _.reduce(
            _.map(items, (item) => item.paidValue),
            (sum, n) => Number(sum) + Number(n),
          ),
        ) || 0;
    }

    return sum;
  }

  @Get()
  async listPayables() {
    const payables = await this.service.findPayables();

    if (payables) {
      const available = _.filter(payables, (payable) => payable.status === PayableStatusENUM.paid);
      const waitingFunds = _.filter(payables, (payable) => payable.status === PayableStatusENUM.waiting_funds);

      return {
        available: {
          balance: this.calculateBalance(available),
          items: available,
        },
        waiting_funds: {
          balance: this.calculateBalance(waitingFunds),
          items: waitingFunds,
        },
      };
    }

    return { available: [], waiting_funds: [] };
  }
}
