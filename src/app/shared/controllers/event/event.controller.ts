import { Controller, Sse } from '@nestjs/common';
import { EventService } from '../../services/event/event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Sse('sse')
  sse() {
    return this.eventService.sseDataStream.asObservable();
  }
}
