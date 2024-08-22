import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: false })
  datetime: Date;

  @Column({ type: 'varchar', length: 255, nullable: false })
  author: string;

  @Column({ type: 'int', nullable: false })
  sum: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  category: string;

  @Column({ type: 'varchar', default: null, length: 255, nullable: true })
  comment?: string;
}
