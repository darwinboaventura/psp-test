import { TransactionPaymentMethodENUM } from '../../transaction/utils/ENUMs/transactionPaymentMethod.enum';
import * as moment from 'moment';

export const subtractFeeFromValue = (value: number, fee: number) => {
  return value - (fee / value) * 100;
};

export const calculateExpectedPaymentDate = (paymentMethod: string) => {
  let date;

  switch (paymentMethod) {
    case TransactionPaymentMethodENUM.debit_card:
      date = moment().format('YYYY-MM-DD HH:MM:ss');
      break;
    case TransactionPaymentMethodENUM.credit_card:
      date = moment()
        .add(30, 'days')
        .format('YYYY-MM-DD HH:MM:ss');
      break;
    default:
      throw new Error('Payment method not mapped');
  }

  return date;
};
