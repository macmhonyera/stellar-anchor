import { IsEnum, IsNumber, IsString } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class WithdrawDto {
  @IsString()
  userPublicKey: string; // User’s Stellar wallet (from XGatePay)

  @IsString()
  assetCode: string;

  @IsNumber()
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType = TransactionType.WITHDRAW; // Default to 'withdraw'
}
