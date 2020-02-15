import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { Payable } from '../payable/payable.entity';
import { TransactionModule } from '../transaction/transaction.module';
import { PayableModule } from '../payable/payable.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.MYSQL_URL,
      database: process.env.MYSQL_DB_NAME,
      synchronize: false,
      entities: [Transaction, Payable],
    }),
    TransactionModule,
    PayableModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
