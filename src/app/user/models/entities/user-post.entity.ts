import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PostEntity } from '../../../post/models/entities';
import { UserEntity } from './user.entity';

@Entity()
export class UserPostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PostEntity, (post) => post.id)
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @CreateDateColumn({
    name: 'created_on',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdOn: Date;

  @UpdateDateColumn({
    name: 'modified_on',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  modifiedOn: Date;

  @DeleteDateColumn({ name: 'deleted_on', nullable: true })
  deletedOn: Date;
}
