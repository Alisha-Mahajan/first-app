import { IsUUID } from 'class-validator';

export class BaseUserPostDTO {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  postId: string;
}
