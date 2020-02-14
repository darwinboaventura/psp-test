import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { Payable } from './payable.entity';
import { Transaction } from '../transaction/transaction.entity';
import { classToPlain } from 'class-transformer';
import { calculateExpectedPaymentDate, subtractFeeFromValue } from './utils/payable.util';
import { TransactionPaymentMethodENUM } from '../transaction/enum/transactionPaymentMethod.enum';
import { CreatePayableRequestDTO } from './dto/request/createPayableRequest.dto';
import { PayableStatusENUM } from './enum/payableStatus.enum';

@Injectable()
export class PayableService {
  constructor() {}

  async getPayableByTransactionId(transactionId: number) {
    return classToPlain(
      await Payable.findOne({
        where: {
          transaction: {
            id: transactionId,
          },
        },
        relations: ['transaction'],
      }),
    );
  }

  async findPayables(filters?: Payable) {
    return classToPlain(
      await Payable.find({
        where: filters,
        relations: ['transaction'],
      }),
    );
  }

  async createPayable(transaction: CreatePayableRequestDTO) {
    const payable = new Payable();

    payable.transaction = { id: transaction.id } as Transaction;
    payable.transactionValue = transaction.value;

    switch (transaction.paymentMethod) {
      case TransactionPaymentMethodENUM.debit_card:
        payable.status = PayableStatusENUM.paid;
        payable.expectedPaymentDate = calculateExpectedPaymentDate(TransactionPaymentMethodENUM.debit_card);
        payable.paidValue = subtractFeeFromValue(transaction.value, 3);

        return classToPlain(await payable.save());
      case TransactionPaymentMethodENUM.credit_card:
        payable.status = PayableStatusENUM.waiting_funds;
        payable.expectedPaymentDate = calculateExpectedPaymentDate(TransactionPaymentMethodENUM.credit_card);
        payable.paidValue = subtractFeeFromValue(transaction.value, 5);

        return classToPlain(await payable.save());
      default:
        throw new Error('Payment method not mapped!');
    }
  }
}
