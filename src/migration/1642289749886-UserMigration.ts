import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration1642289749886 implements MigrationInterface {
  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE [IF NOT EXISTS] user (
            id VARCHAR(25),
            name VARCHAR(25),
            login VARCHAR(10),
            password VARCHAR(10)
        ) `);
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [IF EXISTS] user`);
  }
}
