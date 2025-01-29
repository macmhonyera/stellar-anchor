import { TransactionRepository } from './transaction.repository';
import { Module } from '@nestjs/common';
import { Sep6Service } from './sep6.service';
import { Sep6Controller } from './sep6.controller';
import { TypeOrmModule } from 'src/database/typeorm-ex.module';

@Module({
  imports: [TypeOrmModule.forCustomRepository([TransactionRepository])],
  controllers: [Sep6Controller],
  providers: [Sep6Service],
})
export class Sep6Module {}
