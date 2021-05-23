import { RoleEntity } from '../../../auth/models/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { PostEntity } from '../../../post/models/entities/post.entity';
import { Name } from './name.entity';
import { ImageEntity } from '../../../shared/models/entities';

@Entity()
export class UserEntity extends Name {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column(() => Name, { prefix: false })
  // name: Name;

  @Column()
  email: string;

  @Column()
  address: string;

  @OneToMany(() => PostEntity, (post) => post.user, {
    cascade: ['remove', 'soft-remove'],
  })
  posts: PostEntity[];

  @RelationId((user: UserEntity) => user.posts)
  postIds: string[];

  @ManyToOne(() => RoleEntity, (role) => role.id)
  role: RoleEntity;

  @RelationId((user: UserEntity) => user.role)
  roleId: string;

  @OneToOne(() => ImageEntity, { nullable: true })
  @JoinColumn()
  image: ImageEntity;

  @RelationId((user: UserEntity) => user.image)
  imageId: string;
  // @BeforeInsert()
  // mapNames() {
  //   // const self = this as any;
  //   this.name = { firstName: 'self.firstName', lastName: 'self.lastName' };
  // }

  // @AfterLoad()
  // adaptFromModel() {
  //   const self = this as any;
  //   self.firstName = this.name.firstName;
  //   self.lastName = this.name.firstName;
  // }
}
