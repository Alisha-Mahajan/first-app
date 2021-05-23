import { IsUUID } from 'class-validator';

export class BaseRefreshTokenDTO {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;
}
