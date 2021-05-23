import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PostEntity } from '../../../post/models/entities';
import { UserEntity } from '../../../user/models/entities';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => PostEntity, (post) => post.id)
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
