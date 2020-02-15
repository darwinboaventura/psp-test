import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionRequestDTO, ListTransactionsRequestDTO } from './dto/request';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Transaction } from './transaction.entity';
@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @ApiOperation({ summary: 'Search/list all transactions' })
  @ApiOperation({ summary: 'Create transaction' })
  @ApiResponse({
    status: 200,
    description: 'The transactions found',
    type: [Transaction],
  })
  @Get()
  async listTransactions(@Query() qs: ListTransactionsRequestDTO): Promise<[Transaction]> {
    const options = {
      take: qs.limit,
      skip: qs.offset,
    };

    delete qs.limit;
    delete qs.offset;

    return (await this.service.findTransactions(qs, options)) as [Transaction];
  }

  @ApiOperation({ summary: 'Create transaction' })
  @ApiResponse({
    status: 201,
    description: 'The created transaction',
    type: Transaction,
  })
  @Post()
  async createTransaction(@Body() payload: CreateTransactionRequestDTO) {
    return await this.service.createTransaction(payload);
  }
}
