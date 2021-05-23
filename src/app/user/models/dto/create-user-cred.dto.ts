import { PickType } from '@nestjs/swagger';

import { BaseUserCredDTO } from './base-user-cred.dto';

export class CreateUserCredDTO extends PickType(BaseUserCredDTO, [
  'username',
  'password',
  'userId',
] as const) {}
