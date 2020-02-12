import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { Payable } from './payable.entity';
import { CreatePayableRequestDTO, PayableStatusENUM } from './utils';
import { TransactionPaymentMethodENUM } from '../transaction/utils';
import { Transaction } from '../transaction/transaction.entity';

@Injectable()
export class PayableService {
  constructor() {}

  async getPayableByTransactionId(transactionId: number) {
    return await Payable.findOne({
      where: {
        transaction: {
          id: transactionId,
        },
      },
    });
  }

  async findPayables(filters?: Payable) {
    return await Payable.find({
      where: filters,
    });
  }

  async createPayable(transaction: CreatePayableRequestDTO) {
    const payable = new Payable();

    payable.transaction = { id: transaction.id } as Transaction;
    payable.transactionValue = transaction.value;

    switch (transaction.paymentMethod) {
      case TransactionPaymentMethodENUM.debit_card:
        payable.status = PayableStatusENUM.paid;
        payable.expectedPaymentDate = moment().format('YYYY-MM-DD HH:MM:ss');
        payable.paidValue = transaction.value - (3 / transaction.value) * 100;

        return await payable.save();
      case TransactionPaymentMethodENUM.credit_card:
        payable.status = PayableStatusENUM.waiting_funds;
        payable.expectedPaymentDate = moment()
          .add(30, 'days')
          .format('YYYY-MM-DD HH:MM:ss');
        payable.paidValue = transaction.value - (5 / transaction.value) * 100;

        return await payable.save();
      default:
        throw new Error('Payment method not mapped!');
    }
  }
}
