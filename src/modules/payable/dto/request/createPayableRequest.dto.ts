import { Allow } from 'class-validator';
import { CreateTransactionRequestDTO } from '../../../transaction/dto/request/createTransactionRequest.dto';

export class CreatePayableRequestDTO extends CreateTransactionRequestDTO {
  @Allow()
  id: number;
}
