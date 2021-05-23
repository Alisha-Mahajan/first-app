import { PickType } from '@nestjs/swagger';
import { ImageDTO } from './image.dto';

export class CreateImageDTO extends PickType(ImageDTO, [
  'imageBlob',
  'name',
  'size',
] as const) {}
