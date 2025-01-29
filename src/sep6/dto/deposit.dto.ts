import { IsEnum, IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';
import { ApiProperty } from '@nestjs/swagger';

export class DepositDto {
  @IsString()
  userPublicKey: string; // User’s Stellar wallet (from XGatePay)

  @IsString()
  assetCode: string;

  @IsNumber()
  amount: number;

  @IsEnum(TransactionType)
  @ApiProperty({})
  @IsNotEmpty()
  type: TransactionType = TransactionType.DEPOSIT;
}
