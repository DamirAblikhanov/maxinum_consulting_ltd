import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactions } from './transactions.entity';
import { CreateTransactionDto } from './createTransaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
  ) {}

  async getAllTransactions(): Promise<Transactions[]> {
    return await this.transactionsRepository.find();
  }

  async createNewTransaction(createTransactionDto: CreateTransactionDto): Promise<Transactions> {
    const transaction = this.transactionsRepository.create(createTransactionDto);
    return await this.transactionsRepository.save(transaction);
  }
}
