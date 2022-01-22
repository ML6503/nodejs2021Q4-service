import {MigrationInterface, QueryRunner} from "typeorm";

export class trelloCloneMigration1642807684437 implements MigrationInterface {
    name = 'trelloCloneMigration1642807684437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP COLUMN "column_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP COLUMN "board_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD "columnId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "PK_a672f5f6d03ed69a71f5ae8e803"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ALTER COLUMN "order" DROP DEFAULT
        `);
        await queryRunner.query(`
            DROP SEQUENCE "tasks_order_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772"
        `);
        await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS "tasks_order_seq" OWNED BY "tasks"."order"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ALTER COLUMN "order"
            SET DEFAULT nextval('"tasks_order_seq"')
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "PK_a672f5f6d03ed69a71f5ae8e803" PRIMARY KEY ("order")
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP COLUMN "columnId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD "board_id" character varying(100) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD "column_id" character varying(100) NOT NULL
        `);
    }

}
