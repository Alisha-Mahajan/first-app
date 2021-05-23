import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class BaseUser {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty({ groups: ['create'] })
  firstName: string;

  @IsString()
  @IsNotEmpty({ groups: ['create'] })
  lastName: string;

  @IsEmail()
  @IsNotEmpty({ groups: ['create'] })
  email: string;

  @IsString()
  address?: string;

  @IsOptional()
  @IsUUID()
  imageId?: string;
}
