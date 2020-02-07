import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from 'typeorm';
import { Transaction } from '@transaction/transaction.entity';

@Entity('payable') 
export class Payable {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @OneToOne(type => Transaction)
  @JoinColumn({ name: 'transactionId' })
  transaction: Transaction;
  
  @Column({
    type: 'varchar',
    enum: ['paid', 'waiting_funds'],
    nullable: false,
  })
  status: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  expectedPaymentDate: string;
}