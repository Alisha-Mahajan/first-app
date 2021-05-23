import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BaseCommentDTO {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsUUID()
  postId: string;

  @IsUUID()
  userId: string;
}
