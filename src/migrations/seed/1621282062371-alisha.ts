import { PostEntity } from 'src/app/post/models/entities';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

export class alisha1621282062371 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection('seed')
      .createQueryBuilder()
      .update(PostEntity)
      .set({ message: 'message modified' })
      .where('title = :title', { title: 'post title' })
      .execute();

    await getConnection('seed')
      .createQueryBuilder()
      .insert()
      .into(PostEntity)
      .values({
        message: 'Dummy',
        title: 'Title',
      })
      .execute();

    await getConnection('seed')
      .createQueryBuilder()
      .delete()
      .from(PostEntity)
      .where('id = :id', { id: 'azureCRON' })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
