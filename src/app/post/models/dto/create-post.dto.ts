import { PickType } from '@nestjs/swagger';
import { BasePost } from './base-post.dto';

export class CreatePostDTO extends PickType(BasePost, [
  'message',
  'title',
  'userId',
]) {}
