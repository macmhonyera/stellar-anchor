import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Enum for Transaction Type (Deposit/Withdraw)
export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
}

// Enum for Transaction Status (Pending/Completed/Failed)
export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userPublicKey: string; // User’s Stellar wallet (from XGatePay)

  @Column({
    type: 'enum',
    enum: TransactionType, // Use Enum for Type
    default: TransactionType.DEPOSIT, // Default to 'deposit'
  })
  type: TransactionType;

  @Column()
  assetCode: string;

  @Column('decimal', { precision: 18, scale: 7 })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus, // Use Enum for Status
    default: TransactionStatus.PENDING, // Default to 'pending'
  })
  status: TransactionStatus;

  @Column({ nullable: true })
  txHash: string; // Stellar transaction hash
}
