import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class BaseRoleDTO {
  @IsUUID()
  id: string;

  @IsNumber()
  roleType: number;

  @IsArray()
  permissions: string[];

  @IsString()
  @IsNotEmpty()
  name: string;
}
