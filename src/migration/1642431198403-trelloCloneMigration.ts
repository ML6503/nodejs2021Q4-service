import {MigrationInterface, QueryRunner} from "typeorm";

export class trelloCloneMigration1642431198403 implements MigrationInterface {
    name = 'trelloCloneMigration1642431198403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "name" character varying(100) NOT NULL,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "login" character varying(100) NOT NULL,
                "password" character varying(100) NOT NULL,
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
                "userIdId" uuid,
                CONSTRAINT "PK_a672f5f6d03ed69a71f5ae8e803" PRIMARY KEY ("order")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "boards" (
                "title" character varying(100) NOT NULL,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "columnsId" character varying(100) NOT NULL,
                "tasksOrder" integer,
                CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "FK_4776af095a2d88f235336aab523" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "boards"
            ADD CONSTRAINT "FK_2d9feef8dacdeaa40e2f537f087" FOREIGN KEY ("tasksOrder") REFERENCES "tasks"("order") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "boards" DROP CONSTRAINT "FK_2d9feef8dacdeaa40e2f537f087"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "FK_4776af095a2d88f235336aab523"
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
