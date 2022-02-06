import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Title should be string' })
  @IsOptional()
  title?: string;

  @IsNumber()
  order: number;

  @IsString({ message: 'Description should be string' })
  description: string;

  @IsUUID()
  // @IsString({ message: 'User ID should be string' })
  @IsOptional()
  userId: string | null;

  @IsUUID()
  // @IsString({ message: 'Board ID should be string' })
  @IsOptional()
  boardId: string;

  // @IsString({ message: 'Board ID should be string' })
  @IsUUID()
  @IsOptional()
  columnId: string | null;
}

export class CreatedTaskDto extends PartialType(CreateTaskDto) {
  /**
   * Extends by partial type CreateTaskDto
   */
  constructor(partial: Partial<CreatedTaskDto>) {
    super();
    Object.assign(this, partial);
  }
}
