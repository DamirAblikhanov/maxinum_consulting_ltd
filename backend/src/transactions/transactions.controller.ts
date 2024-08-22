import { Controller, Post, Body, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './createTransaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getAllTransactions() {
    return await this.transactionsService.getAllTransactions();
  }

  @Post()
  async createNewTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return await this.transactionsService.createNewTransaction(createTransactionDto);
  }
}
