import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from '@transaction/transaction.module';
import { PayableModule } from '@payable/payable.module';
import { Transaction } from '@transaction/transaction.entity';
import { Payable } from '@payable/payable.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      entities: [
        Transaction,
        Payable,
      ],
      synchronize: false,
      host: process.env.MYSQL_URL,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    }),
    TransactionModule,
    PayableModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
