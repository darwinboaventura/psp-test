import * as _ from 'lodash';
import { Controller, Get, Param } from '@nestjs/common';
import { PayableStatusENUM } from './enum';
import { PayableService } from './payable.service';
import { GetPayableByTransactionIdRequestDTO } from './dto/request/getPayableByTransactionIdRequest.dto';
import { Transaction } from '../transaction/transaction.entity';
import { Payable } from './payable.entity';
import { classToPlain } from 'class-transformer';

@Controller('payable')
export class PayableController {
  constructor(private readonly service: PayableService) {}

  calculateBalance(items) {
    let sum = 0;

    if (items) {
      items = _.map(items, (item) => item.paidValue);
      sum = _.reduce(items, (value, n) => value + n) || 0;
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

  @Get('/:transactionId')
  async getPayableByTransactionId(@Param() params: GetPayableByTransactionIdRequestDTO) {
    const payable = new Payable();
    payable.transaction = {
      id: params.transactionId,
    } as Transaction;

    const payables = await this.service.findPayables(payable);

    if (payables) {
      return classToPlain(payables[0]);
    }

    return undefined;
  }
}
