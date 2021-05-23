import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserCredDTO } from '../../models/dto';
import { UserCredService } from '../../services/user-cred/user-cred.service';

@ApiTags('user-cred')
@Controller('user-cred')
export class UserCredController {
  constructor(private readonly service: UserCredService) {}

  @Get('')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findByID(id);
  }

  @Post('')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      groups: ['create'],
    }),
  )
  createOne(@Body() dto: CreateUserCredDTO) {
    return this.service.create(dto);
  }
}
