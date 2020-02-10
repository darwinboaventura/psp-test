import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, BaseEntity } from 'typeorm';
import { Transaction } from '@transaction/transaction.entity';

@Entity('payable')
export class Payable extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @OneToOne((type) => Transaction)
  @JoinColumn({ name: 'transactionId' })
  transaction: Transaction;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  transactionValue: number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  paidValue: number;

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

  @Column({
    type: 'timestamp',
    default: new Date(),
    update: false,
    nullable: false,
  })
  createdAt: string;

  @Column({
    type: 'timestamp',
    precision: 3,
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: string;

  @Column({
    type: 'timestamp',
    precision: 3,
    nullable: true,
    insert: false,
  })
  deleteAt: string;
}
