import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IColumn, INewBoard } from '../common/interfaces';

/**
 * constructs Board Entity for typeorm
 * @param title - naming the board
 * @param columns - of this board
 */

@Entity()
export default class BoardEntity {
  @Column()
  title: string | undefined;

  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  columns: Array<IColumn> | [] | undefined;

  constructor(board: INewBoard) {
    const { title, columns } = board;
    this.id = uuidv4();
    this.title = title;
    this.columns = columns && columns.length !== 0 ? columns : [];
  }
}
