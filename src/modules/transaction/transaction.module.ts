import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { PayableModule } from '@payable/payable.module';

@Module({
  imports: [PayableModule],
  exports: [],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
