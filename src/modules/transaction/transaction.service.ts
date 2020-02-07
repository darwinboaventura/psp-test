import { Injectable } from '@nestjs/common';
import { Transaction } from '@transaction/transaction.entity';
import { FindManyOptions } from 'typeorm';
import { ListTransactionsRequestDTO } from './utils/DTOs/request/listTransactionsRequest.dto';

@Injectable()
export class TransactionService {
  constructor() {}

  async findTransactions(filters: ListTransactionsRequestDTO, options: FindManyOptions) {
    return await Transaction.find({
      ...options,
      where: filters,
    } as FindManyOptions<Transaction>);
  }
}