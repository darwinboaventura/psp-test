import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('transaction')
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar'
  })
  description: string;

  @Column({
    type: 'varchar',
    enum: ['debit_card', 'credit_card'],
    nullable: false,
  })
  paymentMethod: string;

  @Column({
    type: 'decimal'
  })
  value: number;

  @Column({
    type: 'varchar',
    length: 4,
    nullable: false,
  })
  cardNumber: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  cardHolderName: string;

  @Column({
    type: 'varchar',
    length: 7,
    nullable: false,
  })
  cardExpirationDate: string;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: false,
  })
  cardVerificationCode: string;

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
