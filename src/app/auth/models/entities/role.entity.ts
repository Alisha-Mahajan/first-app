import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'integer',
  })
  roleType: number;

  @Column({
    type: 'text',
    array: true,
  })
  permissions: string[];

  @Column()
  name: string;
}
