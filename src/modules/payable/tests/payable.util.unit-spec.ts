import { calculateBalance, subtractFeeFromValue, calculateExpectedPaymentDate } from '../utils/payable.util';
import { TransactionPaymentMethodENUM } from '../../transaction/enum/transactionPaymentMethod.enum';
import * as moment from 'moment';

describe('PayableUtil :: Unitary', () => {
  describe('calculateBalance', () => {
    describe('when passing an array of items', () => {
      it('should calculate the sum of all items value', () => {
        const inputData = [
          {
            paidValue: 100,
          },
          {
            paidValue: 120,
          },
        ];

        expect(calculateBalance(inputData)).toBe(220);
      });
    });

    describe('when passing an empty array', () => {
      it('should return zero', () => {
        const inputData = [];

        expect(calculateBalance(inputData)).toBe(0);
      });
    });
  });

  describe('subtractFeeFromValue', () => {
    describe('when recieve a value of 100 and a fee of 5', () => {
      it('should return 95', () => {
        expect(subtractFeeFromValue(100, 5)).toBe(95);
      });
    });

    describe('when recieve a value of 100 and a fee of 3', () => {
      it('should return 97', () => {
        expect(subtractFeeFromValue(100, 3)).toBe(97);
      });
    });
  });

  describe('calculateExpectedPaymentDate', () => {
    describe('when paymentMethod is `debit_card`', () => {
      it('should have expectedPaymentDate as D+0', () => {
        const today = moment();

        expect(
          moment(calculateExpectedPaymentDate(TransactionPaymentMethodENUM.debit_card), 'YYYY-MM-DD').diff(
            today,
            'days',
          ),
        ).toBe(0);
      });
    });

    describe('when paymentMethod is `credit_card`', () => {
      it('should have expectedPaymentDate as D+30', () => {
        const today = moment();

        expect(
          moment(calculateExpectedPaymentDate(TransactionPaymentMethodENUM.credit_card), 'YYYY-MM-DD').diff(
            today,
            'month',
          ),
        ).toBe(1);
      });
    });
  });
});
