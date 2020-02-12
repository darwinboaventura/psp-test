import { Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { CreateTransactionRequestDTO, ListTransactionsRequestDTO } from './utils/DTOs/request';
import { PayableService } from '../payable/payable.service';
import { Transaction } from './transaction.entity';
import { classToPlain } from 'class-transformer';

@Injectable()
export class TransactionService {
  constructor(private payableService: PayableService) {}

  async findTransactions(filters: ListTransactionsRequestDTO, options: FindManyOptions) {
    const transaction = await Transaction.find({
      ...options,
      where: filters,
    } as FindManyOptions<Transaction>);

    return classToPlain(transaction);
  }

  async createTransaction(payload: CreateTransactionRequestDTO) {
    const transaction = Object.assign(new Transaction(), payload, {
      cardNumber: payload.cardNumber.substring(payload.cardNumber.length - 4),
    });

    const createdTransaction = await transaction.save();

    if (createdTransaction) {
      const payable = await this.payableService.getPayableByTransactionId(createdTransaction.id);

      if (!payable) {
        await this.payableService.createPayable(createdTransaction);
      }
    }

    return classToPlain(createdTransaction);
  }
}
