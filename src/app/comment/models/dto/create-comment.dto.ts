import { PickType } from '@nestjs/swagger';
import { BaseCommentDTO } from './base-comment.dto';

export class CreateCommentDTO extends PickType(BaseCommentDTO, [
  'text',
  'postId',
  // 'userId',
] as const) {}
