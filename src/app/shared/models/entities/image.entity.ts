import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('image')
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'image_blob', type: 'bytea' })
  imageBlob: Buffer;

  @Column({ type: 'numeric' })
  size: number;

  @BeforeInsert()
  mapImageBuffer() {
    // this.imageBlob = Buffer.from('\\x' + this.imageBlob.toString('hex'));
  }
}
