import { Module } from "@nestjs/common";
import { PayableService } from './payable.service';

@Module({
  imports: [],
  exports: [PayableService],
  providers: [PayableService],
  controllers: []
})
export class PayableModule {}