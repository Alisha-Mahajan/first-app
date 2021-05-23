import { SetMetadata } from '@nestjs/common';
import { RoleModel } from '../models/model/role.model';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLE_KEY = 'Role';
export const Role = (...roles: RoleModel['name'][]) =>
  SetMetadata(ROLE_KEY, roles);
