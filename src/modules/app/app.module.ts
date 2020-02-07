import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from '@transaction/transaction.module';
import { PayableModule } from '@payable/payable.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
