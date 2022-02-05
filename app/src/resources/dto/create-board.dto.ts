import { PartialType } from '@nestjs/mapped-types';
import { IColumn, ITask } from '../../common/interfaces';

export class CreateBoardDto {
  title: string | undefined;

  columns: Array<IColumn> | [];

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
