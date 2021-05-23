import {MigrationInterface, QueryRunner} from "typeorm";

export class imageSupportPost1619960313192 implements MigrationInterface {
    name = 'imageSupportPost1619960313192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "imageId" uuid`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "UQ_34a189b53541d1ece1750cc4717" UNIQUE ("imageId")`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_34a189b53541d1ece1750cc4717" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_34a189b53541d1ece1750cc4717"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "UQ_34a189b53541d1ece1750cc4717"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "imageId"`);
    }

}
