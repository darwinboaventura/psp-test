import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionRequestDTO, ListTransactionsRequestDTO } from './dto/request';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

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

  @Post()
  async createTransaction(@Body() payload: CreateTransactionRequestDTO) {
    return await this.service.createTransaction(payload);
  }
}
