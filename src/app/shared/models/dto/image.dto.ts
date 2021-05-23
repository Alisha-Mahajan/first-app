import { IsNumber, IsString, IsUUID } from 'class-validator';

export class ImageDTO {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  imageBlob: Buffer;

  @IsNumber()
  size: number;
}
