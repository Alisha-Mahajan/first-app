import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateRoleDTO } from '../../models/dto/create-role.dto';
import { RoleService } from '../../services/role/role.service';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Get('')
  getAllPosts() {
    return this.service.findAll();
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.service.findByID(id);
  }

  @Post()
  createPost(
    @Body(new ValidationPipe({ whitelist: true })) dto: CreateRoleDTO,
  ) {
    return this.service.create(dto);
  }
}
