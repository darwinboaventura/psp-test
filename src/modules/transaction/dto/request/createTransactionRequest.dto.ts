import { IsString, IsNotEmpty, IsEnum, Matches, IsNumber, Min, IsCreditCard, Length } from 'class-validator';
import { TransactionPaymentMethodENUM } from '../../enum/transactionPaymentMethod.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionRequestDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty() // Gambi to solve @nestjs/swagger plugin bug
  description: string;

  @IsNotEmpty()
  @IsEnum(TransactionPaymentMethodENUM)
  paymentMethod: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.1)
  value: number;

  @IsNotEmpty()
  @IsCreditCard()
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  cardHolderName: string;

  @IsNotEmpty()
  @Matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, {
    message: 'Data deve ser enviada no padrão ano-mes-dia exemplo: 02/2025',
  })
  cardExpirationDate: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 5)
  cardVerificationCode: string;
}
