import { CreateTransactionRequestDTO } from '@transaction/utils/DTOs/request';
import { Allow } from 'class-validator';

export class CreatePayableRequestDTO extends CreateTransactionRequestDTO {
  @Allow()
  id: number;
}
