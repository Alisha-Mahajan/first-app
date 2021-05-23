import { UserEntity } from '../../../user/models/entities';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refresh_token')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
