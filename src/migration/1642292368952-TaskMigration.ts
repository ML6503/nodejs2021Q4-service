import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskMigration1642292368952 implements MigrationInterface {
  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE [IF NOT EXISTS] task (
            order INT UNIQUE PRIMARY KEY,    
            id VARCHAR(25) UNIQUE,
            title VARCHAR(25),
            description TEXT,
            columnId VARCHAR(25),
            boardId VARCHAR(25),
            FOREIGN KEY(boardId)
        ) `);
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [IF EXISTS] task`);
  }
}
