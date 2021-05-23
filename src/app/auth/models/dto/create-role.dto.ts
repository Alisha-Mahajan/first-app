import { PickType } from '@nestjs/swagger';
import { BaseRoleDTO } from './base-role.dto';

export class CreateRoleDTO extends PickType(BaseRoleDTO, [
  'name',
  'permissions',
  'roleType',
] as const) {}
