import * as moment from 'moment';
import { Injectable } from "@nestjs/common";
import { TransactionPaymentMethodENUM } from "@transaction/utils/ENUMs/transactionPaymentMethod.enum";
import { Payable } from './payable.entity';
import { PayableStatusENUM } from './utils/ENUMs/payableStatus.enum';
import { CreatePayableRequestDTO } from './utils/DTOs';
import { Transaction } from '@transaction/transaction.entity';

@Injectable()
export class PayableService {
  constructor() {}

  async createPayable(transaction: CreatePayableRequestDTO) {
    const payable = new Payable();

    payable.transaction = { id: transaction.id } as Transaction;

    switch (transaction.paymentMethod) {
      case TransactionPaymentMethodENUM.debit_card:
        payable.status = PayableStatusENUM.paid;
        payable.expectedPaymentDate = moment().format('YYYY-MM-DD HH:MM:ss');

        return await payable.save();
      case TransactionPaymentMethodENUM.credit_card:        
          payable.transaction = { id: transaction.id } as Transaction;
          payable.status = PayableStatusENUM.waiting_funds;
          payable.expectedPaymentDate = moment().add(30, 'days').format('YYYY-MM-DD HH:MM:ss');
  
          return await payable.save();
      default:
        throw new Error('Payment method not mapped!');
    }
  }
}