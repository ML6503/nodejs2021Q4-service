import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { IColumn, ITask } from '../../common/interfaces';

export class CreateBoardDto {
  @IsString({ message: 'Title should be string' })
  @IsOptional()
  title: string | undefined;

  @IsArray()
  // @IsOptional()
  columns: Array<IColumn> | [];

  @IsArray()
  @IsOptional()
  tasks?: Array<ITask> | [];
}

export class CreatedBoardDto extends PartialType(CreateBoardDto) {
  /**
   * Extends by partial type CreateBoardDto
   */
  constructor(partial: Partial<CreatedBoardDto>) {
    super();
    Object.assign(this, partial);
  }
}
