import { Payable } from '../../payable.entity';
import { ApiProperty } from '@nestjs/swagger';

class PayableGroupDTO {
  balance: number;

  @ApiProperty({ type: () => [Payable] })
  items: [Payable];
}

export class ListPayablesResponsesDTO {
  @ApiProperty() // Gambi to solve @nestjs/swagger plugin bug
  available: PayableGroupDTO;

  waiting_funds: PayableGroupDTO;
}
