import { PartialType } from '@nestjs/mapped-types';

export class CreateTaskDto {
  title?: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

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
