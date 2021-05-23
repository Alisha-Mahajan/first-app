import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum Environment {
  DEV = 'dev',
  PROD = 'prod',
  TEST = 'test',
}

export class EnvSchema {
  @IsString()
  DB_TYPE: string;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASS: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  COOKIE_SECRET: string;

  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.PROD;

  @Transform(({ value }) => (value ? value.split(',') : []))
  @IsString({ each: true })
  @IsOptional()
  CORS_ALLOWED_ORIGINS: string;
}
