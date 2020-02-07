import {IsOptional, IsString, IsEnum, Matches, IsNumber, Min} from 'class-validator';
import { TransactionPaymentMethodENUM } from '../../ENUMs/transactionPaymentMethod.enum';

export class ListTransactionsRequestDTO {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TransactionPaymentMethodENUM)
  paymentMethod?: TransactionPaymentMethodENUM;

  @IsOptional()
  @IsString()
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, {
    message: 'Data deve ser enviada no padrão ano-mes-dia exemplo: 2019-05-21',
  })
  createdAt?: string;

  @IsOptional()
  @IsString()
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, {
    message: 'Data deve ser enviada no padrão ano-mes-dia exemplo: 2019-05-21',
  })
  updatedAt?: string;

  @IsOptional()
  @IsString()
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, {
    message: 'Data deve ser enviada no padrão ano-mes-dia exemplo: 2019-05-21',
  })
  deleteAt?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
  
  @IsOptional()
  @IsNumber()
  @Min(1)
  offset?: number;
}