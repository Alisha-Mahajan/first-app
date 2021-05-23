import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './controllers/event/event.controller';
import { ImageController } from './controllers/image/image.controller';
import { ImageEntity } from './models/entities';
import { ImageService } from './services';
import { EventService } from './services/event/event.service';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],
  controllers: [ImageController, EventController],
  providers: [ImageService, EventService],
  exports: [ImageService],
})
export class SharedModule {}
