import { Allow } from 'class-validator';
import { CreateTransactionRequestDTO } from '../../../../transaction/utils/DTOs/request/createTransactionRequest.dto';

export class CreatePayableRequestDTO extends CreateTransactionRequestDTO {
  @Allow()
  id: number;
}
