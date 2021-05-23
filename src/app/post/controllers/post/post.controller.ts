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
import { CurrentUser } from 'src/app/shared/decorator';
import { ImageService } from 'src/app/shared/services';
import { UserEntity } from '../../../user/models/entities';
import { UserPostService } from '../../../user/services/user-post/user-post.service';
import { CreatePostDTO, UpdatePostDTO } from '../../models/dto';

import { PostService } from '../../services/post/post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(
    private readonly service: PostService,
    private readonly imageService: ImageService,
    private readonly userPostService: UserPostService,
  ) {}

  @Get('')
  getAllPosts() {
    return this.service.findAll();
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.service.findByID(id);
  }

  // @Post()
  // createPost(
  //   @Body(new ValidationPipe({ whitelist: true })) dto: CreatePostDTO,
  // ) {
  //   return this.service.create(dto);
  // }

  @Post('')
  @UseInterceptors(FileInterceptor('avatar'))
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreatePostDTO,
  ) {
    console.log(file, dto);

    const imageEntity = file
      ? await this.imageService.createDTOAndSave(file)
      : undefined;
    return this.service.create(dto, imageEntity);
  }

  @Patch(':id')
  update(
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    dto: UpdatePostDTO,
    @Param('id') id: string,
  ) {
    return this.service.update(id, dto);
  }

  @Patch(':id/react')
  updateReactionOnPost(
    @CurrentUser() user: UserEntity,
    @Param('id') id: string,
  ) {
    return this.service.reactOnPost(id, user.id);
  }
}
