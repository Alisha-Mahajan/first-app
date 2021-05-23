import {MigrationInterface, QueryRunner} from "typeorm";

export class roleAuthRelation1618813286165 implements MigrationInterface {
    name = 'roleAuthRelation1618813286165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_95ab8e7157a5bb4bc0e51aefdd2"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "UQ_95ab8e7157a5bb4bc0e51aefdd2"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_95ab8e7157a5bb4bc0e51aefdd2" FOREIGN KEY ("roleId") REFERENCES "role_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_95ab8e7157a5bb4bc0e51aefdd2"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "UQ_95ab8e7157a5bb4bc0e51aefdd2" UNIQUE ("roleId")`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_95ab8e7157a5bb4bc0e51aefdd2" FOREIGN KEY ("roleId") REFERENCES "role_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
