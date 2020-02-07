import { Controller, Get, Query } from '@nestjs/common';
import { ListTransactionsRequestDTO } from './utils/DTOs/request/listTransactionsRequest.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly service: TransactionService,
  ) {}

  @Get()
  async listTransactions(@Query() qs: ListTransactionsRequestDTO) {
    const options = {
      take: qs.limit,
      skip: qs.offset,
    };

    delete qs.limit;
    delete qs.offset;

    return await this.service.findTransactions(qs, options);
  }
}