import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BasePost {
  @IsUUID()
  id: string;

  @IsString()
  message: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString({ each: true })
  likesFromUser: string[];

  @IsUUID()
  userId: string;
}
