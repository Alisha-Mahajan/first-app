import { MigrationInterface, QueryRunner } from 'typeorm';

export class userCred1618599446897 implements MigrationInterface {
  name = 'userCred1618599446897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_cred" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_5f49d7f87c3a0164e885c4601d" UNIQUE ("userId"), CONSTRAINT "PK_2477c67248457ca142cf1bc1765" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_cred" ADD CONSTRAINT "FK_5f49d7f87c3a0164e885c4601df" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_cred" DROP CONSTRAINT "FK_5f49d7f87c3a0164e885c4601df"`,
    );
    await queryRunner.query(`DROP TABLE "user_cred"`);
  }
}
