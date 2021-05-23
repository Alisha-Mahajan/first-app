import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { resolve } from 'path';
import { Environment } from 'src/env-schema';

import { envValidator as validate } from '../env.validate';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: ['../.env', '../.env.defaults'],
      // in order to not explicitly specify import of config module
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validate,
    }),
    UserModule,
    PostModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          database: configService.get('DB_NAME'),
          // extra props
          autoLoadEntities: true,
          keepConnectionAlive:
            configService.get('NODE_ENV') === Environment.DEV,
          entities: [resolve(__dirname, '**/*.entity{.ts,.js}')],
          migrations: [
            resolve(__dirname, '..', 'migrations/entities/*{.ts,.js}'),
          ],
          cli: {
            migrationsDir: resolve(__dirname, '..', 'migrations/entities'),
          },
          // namingStrategy: new SnakeNamingStrategy(),
        } as TypeOrmModuleAsyncOptions),
    }),
    AuthModule,
    CommentModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
