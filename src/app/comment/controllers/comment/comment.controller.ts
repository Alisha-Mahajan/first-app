import { Body, Controller, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { PostEntity } from '../../../post/models/entities';

import { CreateCommentDTO } from '../../models/dto';
import { CommentEntity } from '../../models/entities/comment.entity';
import { CommentService } from '../../services/comment/comment.service';

@Crud({
  model: {
    type: CommentEntity,
  },
  params: {
    id: {
      primary: true,
      type: 'uuid',
      field: 'id', // must have
    },
  },
  query: {
    alwaysPaginate: true, // to get count
    join: {
      post: {
        eager: true,
      },
      user: {
        eager: true,
      },
    },
  },
  validation: {
    whitelist: true,
  },
})
@CrudAuth({
  // property: 'user',
  persist: (req: Request) => {
    return req.user;
  },
})
@ApiTags('comment')
@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentController implements CrudController<CommentEntity> {
  constructor(readonly service: CommentService) {}

  get base(): CrudController<CommentEntity> {
    return this;
  }

  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @Body(new ValidationPipe({ whitelist: true })) dto: CreateCommentDTO,
  ) {
    const comment = new CommentEntity();
    comment.text = dto.text;
    //plainToClass create object of class and specified these properties without
    // need to explicitly mentioning constructor and copying properties from partial object ref
    comment.post = plainToClass(PostEntity, { id: dto.postId });
    // comment.user = plainToClass(UserEntity, { id: dto.userId });
    return this.service.createOne(req, comment);
  }
}
