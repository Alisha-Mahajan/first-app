import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BaseUserCredDTO {
  @IsUUID()
  id: string;

  @IsUUID(4, { groups: ['create'] })
  userId: string;

  @IsString({ groups: ['create'] })
  @IsNotEmpty()
  username: string;

  @IsString({ groups: ['create'] })
  @IsNotEmpty()
  password: string;
}
