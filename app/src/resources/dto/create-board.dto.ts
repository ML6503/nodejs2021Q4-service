import { IColumn, ITask } from '../../common/interfaces';
export class CreateBoardDto {
  title: string | undefined;
  columns: Array<IColumn> | [];
  tasks?: Array<ITask> | [];
}
