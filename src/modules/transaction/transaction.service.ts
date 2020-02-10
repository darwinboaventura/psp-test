import { Injectable } from '@nestjs/common';
import { Transaction } from '@transaction/transaction.entity';
import { FindManyOptions } from 'typeorm';
import { CreateTransactionRequestDTO, ListTransactionsRequestDTO } from './utils/DTOs/request';
import { PayableService } from '@payable/payable.service';

@Injectable()
export class TransactionService {
  constructor(private payableService: PayableService) {}

  async findTransactions(filters: ListTransactionsRequestDTO, options: FindManyOptions) {
    return await Transaction.find({
      ...options,
      where: filters,
    } as FindManyOptions<Transaction>);
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

    return createdTransaction;
  }
}
