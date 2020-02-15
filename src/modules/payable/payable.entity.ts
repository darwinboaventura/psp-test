import { Transform } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, BaseEntity } from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';
import * as moment from 'moment';
import { ApiProperty } from '@nestjs/swagger';

@Entity('payable')
export class Payable extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  @ApiProperty() // Gambi to solve @nestjs/swagger plugin bug
  id: number;

  @OneToOne((type) => Transaction)
  @JoinColumn({ name: 'transactionId' })
  transaction: Transaction;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  @Transform((value) => parseFloat(value))
  transactionValue: number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  @Transform((value) => parseFloat(value))
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
  @Transform((value) => moment(value).format('YYYY-MM-DD'))
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
