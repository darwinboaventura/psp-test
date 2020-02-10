import { IsString, IsNotEmpty, IsEnum, MaxLength, Matches, IsNumber, Min, MinLength } from 'class-validator';
import { TransactionPaymentMethodENUM } from '../../ENUMs/transactionPaymentMethod.enum';

export class CreateTransactionRequestDTO {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(TransactionPaymentMethodENUM)
  paymentMethod: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.1)
  value: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
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
  cardVerificationCode: string;
}
