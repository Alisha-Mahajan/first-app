import { MigrationInterface, QueryRunner } from 'typeorm';

export class imageSupport1619953578865 implements MigrationInterface {
  name = 'imageSupport1619953578865';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "image_blob" bytea NOT NULL, "size" numeric NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user_entity" ADD "imageId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD CONSTRAINT "UQ_32147d1eda24c0c99c15f11b7fc" UNIQUE ("imageId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD CONSTRAINT "FK_32147d1eda24c0c99c15f11b7fc" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_entity" DROP CONSTRAINT "FK_32147d1eda24c0c99c15f11b7fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" DROP CONSTRAINT "UQ_32147d1eda24c0c99c15f11b7fc"`,
    );
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "imageId"`);
    await queryRunner.query(`DROP TABLE "image"`);
  }
}
