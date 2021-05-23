import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BehaviorSubject } from 'rxjs';
import { PostEventModel } from 'src/app/post/models';
import { EventType } from '../../enums';
import { BaseEventModel } from '../../models';

@Injectable()
export class EventService {
  sseDataStream = new BehaviorSubject<BaseEventModel>(null);

  @OnEvent(EventType.POST_CREATED)
  postCreatedEvent(payload: PostEventModel) {
    return this.sseDataStream.next(payload);
  }
}
