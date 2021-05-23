import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CreateImageDTO } from 'src/app/shared/models/dto/create-image.dto';

import { ImageService } from '../../../shared/services';
import { CreateUserDTO, UpdateUserDto } from '../../models/dto';
import { BaseUser } from '../../models/dto/base-user.dto';
import { UserService } from '../../services/user/user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly imageService: ImageService,
  ) {}

  @Get('')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') userId: string) {
    return this.service.findWithRelByID(userId);
  }

  // @Post('')
  // @UsePipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     groups: ['create'],
  //   }),
  // )
  // createOne(@Body() userDTO: CreateUserDTO) {
  //   return this.service.create(userDTO);
  // }

  @Patch(':id')
  updateOne(
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    dto: UpdateUserDto,
    @Param('id') id: string,
  ) {
    return this.service.update(id, dto);
  }

  @Post('')
  @UseInterceptors(FileInterceptor('avatar'))
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateUserDTO,
  ) {
    console.log(file, dto);
    const imageEntity = await this.imageService.createDTOAndSave(file);
    return this.service.create(dto, imageEntity);
  }
}
