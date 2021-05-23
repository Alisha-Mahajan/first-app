import { MigrationInterface, QueryRunner } from 'typeorm';

export class userReactionsOnPost1621275432144 implements MigrationInterface {
  name = 'userReactionsOnPost1621275432144';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" RENAME COLUMN "reactions" TO "likesFromUser"`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "likesFromUser"`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD "likesFromUser" uuid array NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "likesFromUser"`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD "likesFromUser" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" RENAME COLUMN "likesFromUser" TO "reactions"`,
    );
  }
}
