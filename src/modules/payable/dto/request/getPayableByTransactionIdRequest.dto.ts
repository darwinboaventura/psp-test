import { IsNotEmpty } from 'class-validator';

export class GetPayableByTransactionIdRequestDTO {
  @IsNotEmpty()
  transactionId: number;
}
