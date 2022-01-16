import { MigrationInterface, QueryRunner } from 'typeorm';

export class BoardMigration1642292379867 implements MigrationInterface {
  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE [IF NOT EXISTS] board (
            id VARCHAR(25) UNIQUE PRIMARY KEY,
            title VARCHAR(25),
            columns TEXT [],
            tasks TEXT []
        ) `);
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [IF EXISTS] board`);
  }
}
