import { BaseUser } from './base-user.dto';
import { PickType } from '@nestjs/swagger';

export class CreateUserDTO extends PickType(BaseUser, [
  'firstName',
  'lastName',
  'email',
  'address',
] as const) {}
