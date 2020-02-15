import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetPayableByTransactionIdRequestDTO {
  @IsNotEmpty()
  @ApiProperty() // Gambi to solve @nestjs/swagger plugin bug
  transactionId: number;
}
