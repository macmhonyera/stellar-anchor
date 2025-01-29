import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdrawal.dto';
import {
  TransactionType,
  TransactionStatus,
} from './entities/transaction.entity';
import {
  Asset,
  TransactionBuilder,
  Operation,
  Networks,
  Keypair,
  Horizon,
} from '@stellar/stellar-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class Sep6Service {
  private stellarPublicKey: string = process.env.STELLAR_PUBLIC_KEY;
  private stellarSecretKey: string = process.env.STELLAR_SECRET_KEY;
  private server: Horizon.Server;

  constructor(private readonly transactionRepo: TransactionRepository) {
    // Ensure the keys are loaded correctly
    if (!this.stellarPublicKey || !this.stellarSecretKey) {
      throw new InternalServerErrorException(
        'Stellar public or secret key is not set in the .env file',
      );
    }

    this.server = new Horizon.Server('https://horizon-testnet.stellar.org');
  }

  // Helper method to get Stellar Keypair
  private getStellarKeypair(): Keypair {
    return Keypair.fromSecret(this.stellarSecretKey);
  }

  private async loadAccount(publicKey: string) {
    // Load the Stellar account using the public key
    return await this.server.loadAccount(publicKey);
  }

  private async loadAnchorAccount() {
    // Use the anchor’s Stellar secret key to load their account
    const keypair = this.getStellarKeypair();
    return await this.server.loadAccount(keypair.publicKey());
  }

  async processDeposit(data: DepositDto): Promise<any> {
    const { userPublicKey, assetCode, amount } = data;

    // Load the anchor's account and user's account
    const anchorAccount = await this.loadAnchorAccount();
    const userAccount = await this.loadAccount(userPublicKey);

    const asset = new Asset(assetCode, this.stellarPublicKey);
    const transaction = new TransactionBuilder(userAccount, {
      fee: '100',
      networkPassphrase: Networks.TESTNET,  // You can change to PUBLIC for the mainnet
    })
      .addOperation(
        Operation.payment({
          destination: userPublicKey,
          asset,
          amount: amount.toString(),
        }),
      )
      .setTimeout(180)
      .build();

    const keypair = this.getStellarKeypair();
    transaction.sign(keypair);

    try {
      // Submit Stellar Transaction for deposit
      const transactionResponse = await this.submitTransaction(transaction);

      // Save Transaction Record with Enum for type and status
      const savedTransaction = await this.transactionRepo.saveTransaction(
        userPublicKey,
        TransactionType.DEPOSIT,
        assetCode,
        amount,
        TransactionStatus.COMPLETED,
        transactionResponse.hash,
      );

      return {
        message: 'Deposit successful!',
        txHash: transactionResponse.hash,
      };
    } catch (error) {
      console.error('Error during deposit transaction:', error.message);
      throw new InternalServerErrorException('Failed to process deposit.');
    }
  }

  async processWithdraw(data: WithdrawDto): Promise<any> {
    const { userPublicKey, assetCode, amount } = data;

    // Load the anchor's account and user's account
    const anchorAccount = await this.loadAnchorAccount();
    const userAccount = await this.loadAccount(userPublicKey);

    const asset = new Asset(assetCode, this.stellarPublicKey);
    const transaction = new TransactionBuilder(userAccount, {
      fee: '100',
      networkPassphrase: Networks.TESTNET,  // You can change to PUBLIC for the mainnet
    })
      .addOperation(
        Operation.payment({
          destination: userPublicKey,
          asset,
          amount: amount.toString(),
        }),
      )
      .setTimeout(180)
      .build();

    const keypair = this.getStellarKeypair();
    transaction.sign(keypair);

    try {
      // Submit Stellar Transaction for withdrawal
      const transactionResponse = await this.submitTransaction(transaction);

      // Save Transaction Record with Enum for type and status
      const savedTransaction = await this.transactionRepo.saveTransaction(
        userPublicKey,
        TransactionType.WITHDRAW,
        assetCode,
        amount,
        TransactionStatus.PENDING,
        transactionResponse.hash,
      );

      return {
        message: 'Withdrawal initiated! Await processing.',
        txHash: transactionResponse.hash,
      };
    } catch (error) {
      console.error('Error during withdrawal transaction:', error.message);
      throw new InternalServerErrorException('Failed to process withdrawal.');
    }
  }

  private async submitTransaction(transaction: any) {
    // Submit the transaction to Stellar network
    return await this.server.submitTransaction(transaction);
  }
}
