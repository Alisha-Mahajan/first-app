import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SharedModule } from '../shared/shared.module';
import { UserCredController } from './controllers/user-cred/user-cred.controller';
import { UserController } from './controllers/user/user.controller';
import { UserCredEntity, UserEntity, UserPostEntity } from './models/entities';
import { UserCredService } from './services/user-cred/user-cred.service';
import { UserPostService } from './services/user-post/user-post.service';
import { UserService } from './services/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserCredEntity, UserPostEntity]),
    SharedModule,
  ],
  controllers: [UserController, UserCredController],
  providers: [
    UserService,
    UserCredService,
    UserPostService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [UserCredService, UserService, UserPostService],
})
export class UserModule {}
