import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsDateString()
  datetime: Date;

  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty({ message: 'Author should not be empty!' })
  @IsString({ message: 'Author must be a string!' })
  @MaxLength(255, { message: 'Author is too long!' })
  author: string;

  @IsNotEmpty()
  @IsNumber()
  sum: number;

  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty({ message: 'Category should not be empty!' })
  @IsString({ message: 'Category must be a string!' })
  @MaxLength(255, { message: 'Category is too long!' })
  category: string;

  @IsOptional()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty({ message: 'Category should not be empty!' })
  @IsString({ message: 'Category must be a string!' })
  @MaxLength(255, { message: 'Category is too long!' })
  comment?: string;
}
