import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { PostController } from './controllers/post/post.controller';
import { PostEntity } from './models/entities';
import { PostService } from './services/post/post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    SharedModule,
    EventEmitterModule.forRoot(),
    UserModule,
  ],
  controllers: [PostController],
  providers: [
    PostService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class PostModule {}
