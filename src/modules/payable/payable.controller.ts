import * as _ from 'lodash';
import { Controller, Get } from '@nestjs/common';
import { PayableService } from '@payable/payable.service';
import { PayableStatusENUM } from './utils/ENUMs';

@Controller('payable')
export class PayableController {
  constructor(private readonly service: PayableService) {}

  calculateBalance(items) {
    return Number(
      _.reduce(
        _.map(items, (item) => item.paidValue),
        (sum, n) => Number(sum) + Number(n),
      ),
    );
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
