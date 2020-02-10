import { Module } from "@nestjs/common";
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';

@Module({
  imports: [],
  exports: [PayableService],
  providers: [PayableService],
  controllers: [
    PayableController
  ]
})
export class PayableModule {}