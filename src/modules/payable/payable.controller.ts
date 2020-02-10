import * as _ from 'lodash';
import { Controller, Get } from "@nestjs/common";
import { PayableService } from '@payable/payable.service';
import { PayableStatusENUM } from './utils/ENUMs/payableStatus.enum';

@Controller('payable')
export class PayableController {
  constructor(
    private readonly service: PayableService
  ) {}

  @Get()
  async listPayables() {
    const payables = await this.service.findPayables();

    if (payables) {
      const available = _.filter(payables, (payable) => payable.status === PayableStatusENUM.paid);
      const waitingFunds = _.filter(payables, (payable) => payable.status === PayableStatusENUM.waiting_funds);

      return {
        available: {
          balance: Number(_.reduce(_.map(available, (item) => item.paidValue), (sum, n) => Number(sum) + Number(n))),
          items: available,
        },
        waiting_funds: {
          balance: Number(_.reduce(_.map(waitingFunds, (item) => item.paidValue), (sum, n) => Number(sum) + Number(n))),
          items: waitingFunds,
        },
      };
    }

    return {available: [], waiting_funds: []};
  }
}