import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { ImageEntity } from '../../../shared/models/entities';
import { UserEntity } from '../../../user/models/entities';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column()
  title: string;

  @Column('uuid', { array: true, default: [] })
  likesFromUser: string[];

  @ManyToOne(() => UserEntity, (user) => user.posts, { nullable: false })
  user: UserEntity;

  @RelationId((post: PostEntity) => post.user)
  userId: string;

  @OneToOne(() => ImageEntity, { nullable: true })
  @JoinColumn()
  image: ImageEntity;

  @RelationId((post: PostEntity) => post.image)
  imageId: string;
}
