import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1642356890171 implements MigrationInterface {
    name = 'UserMigration1642356890171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("name" character varying(100) NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("title" character varying(100) NOT NULL, "description" text NOT NULL, "order" SERIAL NOT NULL, "columnId" character varying(100) NOT NULL, "boardId" character varying(100) NOT NULL, "userId" character varying(100), "id" uuid NOT NULL, "userIdId" uuid, CONSTRAINT "PK_345c0f411d83bb3be3ae0d53363" PRIMARY KEY ("order"))`);
        await queryRunner.query(`CREATE TABLE "board" ("title" character varying(100) NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "columnsId" character varying(100) NOT NULL, "tasksOrder" integer, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_29c593b244774c65824ae1df648" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_998d5cbd651be87d5c888aae761" FOREIGN KEY ("tasksOrder") REFERENCES "task"("order") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_998d5cbd651be87d5c888aae761"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_29c593b244774c65824ae1df648"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
