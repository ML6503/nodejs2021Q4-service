import {MigrationInterface, QueryRunner} from "typeorm";

export class trelloCloneMigration1642983909205 implements MigrationInterface {
    name = 'trelloCloneMigration1642983909205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP COLUMN "title"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD "title" character varying(100) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP COLUMN "title"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD "title" character varying NOT NULL
        `);
    }

}
