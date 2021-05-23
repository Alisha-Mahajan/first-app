import {MigrationInterface, QueryRunner} from "typeorm";

export class roles1618750752842 implements MigrationInterface {
    name = 'roles1618750752842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roleType" integer NOT NULL, "permissions" text array NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_7bc1bd2364b6e9bf7c84b1e52e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "role_entity"`);
    }

}
