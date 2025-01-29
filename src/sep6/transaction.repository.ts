import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from './entities/transaction.entity';

@CustomRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  async saveTransaction(
    userPublicKey: string,
    type: TransactionType,
    assetCode: string,
    amount: number,
    status: TransactionStatus,
    txHash?: string,
  ): Promise<Transaction> {
    const transaction = this.create({
      userPublicKey,
      type,
      assetCode,
      amount,
      status,
      txHash,
    });

    return await this.save(transaction);
  }

  async findTransactionByTxHash(
    txHash: string,
  ): Promise<Transaction | undefined> {
    return this.findOne({ where: { txHash } });
  }
}
