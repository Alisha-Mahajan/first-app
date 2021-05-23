import { PickType } from '@nestjs/swagger';
import { BaseUserPostDTO } from './base-user-post.dto';

export class CreateUserPostDTO extends PickType(BaseUserPostDTO, [
  'userId',
  'postId',
] as const) {}
