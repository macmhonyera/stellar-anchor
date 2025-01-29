import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { Sep6Service } from './sep6.service';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdrawal.dto';

@Controller('sep6')
export class Sep6Controller {
  constructor(private readonly sep6Service: Sep6Service) {}

  @Post('deposit')
  async deposit(@Body() depositDto: DepositDto) {
    return this.sep6Service.processDeposit(depositDto);
  }

  @Post('withdraw')
  async withdraw(@Body() withdrawDto: WithdrawDto) {
    return this.sep6Service.processWithdraw(withdrawDto);
  }

}
