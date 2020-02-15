import * as _ from 'lodash';
import { Controller, Get, Param } from '@nestjs/common';
import { PayableStatusENUM } from './enum';
import { PayableService } from './payable.service';
import { GetPayableByTransactionIdRequestDTO } from './dto/request/getPayableByTransactionIdRequest.dto';
import { Transaction } from '../transaction/transaction.entity';
import { Payable } from './payable.entity';
import { classToPlain } from 'class-transformer';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { calculateBalance } from './utils/payable.util';
import { ListPayablesResponsesDTO } from './dto';

@ApiTags('Payable')
@Controller('payable')
export class PayableController {
  constructor(private readonly service: PayableService) {}

  @ApiOperation({ summary: 'Search/list all payables' })
  @ApiResponse({
    status: 200,
    description: 'The payables found',
    type: ListPayablesResponsesDTO,
  })
  @Get()
  async listPayables() {
    const payables = await this.service.findPayables();

    if (payables) {
      const available = _.filter(payables, (payable) => payable.status === PayableStatusENUM.paid);
      const waitingFunds = _.filter(payables, (payable) => payable.status === PayableStatusENUM.waiting_funds);

      return {
        available: {
          balance: calculateBalance(available),
          items: available,
        },
        waiting_funds: {
          balance: calculateBalance(waitingFunds),
          items: waitingFunds,
        },
      };
    }

    return { available: [], waiting_funds: [] };
  }

  @ApiOperation({ summary: 'Get payable by transaction id' })
  @ApiResponse({
    status: 200,
    description: 'The payable found',
    type: Payable,
  })
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
