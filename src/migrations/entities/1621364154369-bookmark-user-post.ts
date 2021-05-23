import { MigrationInterface, QueryRunner } from 'typeorm';

export class bookmarkUserPost1621364154369 implements MigrationInterface {
  name = 'bookmarkUserPost1621364154369';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_post_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_on" TIMESTAMP NOT NULL DEFAULT now(), "modified_on" TIMESTAMP NOT NULL DEFAULT now(), "deleted_on" TIMESTAMP, "postId" uuid, "userId" uuid, CONSTRAINT "PK_cdd3bf9ad72ceb804fba0cfd85f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_post_entity" ADD CONSTRAINT "FK_055ec1f16c9e4715047363590ed" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_post_entity" ADD CONSTRAINT "FK_7d2b89566d919cd526e55ec37fe" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_post_entity" DROP CONSTRAINT "FK_7d2b89566d919cd526e55ec37fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_post_entity" DROP CONSTRAINT "FK_055ec1f16c9e4715047363590ed"`,
    );
    await queryRunner.query(`DROP TABLE "user_post_entity"`);
  }
}
