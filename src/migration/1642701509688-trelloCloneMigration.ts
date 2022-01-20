import {MigrationInterface, QueryRunner} from "typeorm";

export class trelloCloneMigration1642701509688 implements MigrationInterface {
    name = 'trelloCloneMigration1642701509688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "name" character varying(100) NOT NULL,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "login" character varying(100) NOT NULL,
                "password" character varying(100) NOT NULL,
                "boardId" uuid,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tasks" (
                "title" character varying(100) NOT NULL,
                "description" text NOT NULL,
                "order" SERIAL NOT NULL,
                "column_id" character varying(100) NOT NULL,
                "board_id" character varying(100) NOT NULL,
                "user_id" character varying(100),
                "id" uuid NOT NULL,
                "boardId" uuid,
                "userId" uuid,
                CONSTRAINT "PK_a672f5f6d03ed69a71f5ae8e803" PRIMARY KEY ("order")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "boards" (
                "title" character varying(100) NOT NULL,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "columns" jsonb NOT NULL DEFAULT '[]',
                CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_6522d5a65fc85cc92081c8aadbc" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "FK_8a75fdea98c72c539a0879cb0d1" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "FK_8a75fdea98c72c539a0879cb0d1"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_6522d5a65fc85cc92081c8aadbc"
        `);
        await queryRunner.query(`
            DROP TABLE "boards"
        `);
        await queryRunner.query(`
            DROP TABLE "tasks"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}
