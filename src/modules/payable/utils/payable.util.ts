import { TransactionPaymentMethodENUM } from '../../transaction/enum/transactionPaymentMethod.enum';
import * as moment from 'moment';
import * as _ from 'lodash';

export const calculateBalance = (items) => {
  let sum = 0;

  if (items) {
    items = _.map(items, (item) => item.paidValue);
    sum = _.reduce(items, (value, n) => value + n) || 0;
  }

  return sum;
};

export const subtractFeeFromValue = (value: number, fee: number) => {
  return value - (fee / value) * 100;
};

export const calculateExpectedPaymentDate = (paymentMethod: string) => {
  let date;

  switch (paymentMethod) {
    case TransactionPaymentMethodENUM.debit_card:
      date = moment();
      break;
    case TransactionPaymentMethodENUM.credit_card:
      date = moment().add(30, 'days');
      break;
    default:
      throw new Error('Payment method not mapped');
  }

  return date.format('YYYY-MM-DD HH:MM:ss');
};
