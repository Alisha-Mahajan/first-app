import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { Repository } from 'typeorm';

import { EventType } from '../../../shared/enums';
import { ImageEntity } from '../../../shared/models/entities';
import { UserEntity } from '../../../user/models/entities';
import { PostEventModel } from '../../models';
import { CreatePostDTO, UpdatePostDTO } from '../../models/dto';
import { PostEntity } from '../../models/entities';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repository: Repository<PostEntity>,
    private eventEmitter: EventEmitter2,
  ) {}

  findAll() {
    return this.repository.find({ relations: ['user'] });
  }

  findByID(id: string) {
    return this.repository.findOne(id);
  }

  async create(dto: CreatePostDTO, imageEntity?: ImageEntity) {
    const post = this.repository.create(dto);
    post.user = new UserEntity();
    post.user.id = dto.userId;

    if (imageEntity) {
      post.image = imageEntity;
    }

    const postObj = await this.repository.save(post);
    this.eventEmitter.emit(
      EventType.POST_CREATED,
      new PostEventModel({
        id: postObj.id,
        message: postObj.message,
        title: postObj.title,
      }),
    );
    return postObj;
  }

  update(id: string, dto: UpdatePostDTO) {
    return this.repository.update(id, dto);
  }

  async reactOnPost(id: string, userId: string) {
    const { likesFromUser } = await this.repository.findOne(id, {
      select: ['likesFromUser'],
    });

    const userIndex = likesFromUser.indexOf(userId);

    userIndex === -1
      ? likesFromUser.push(userId)
      : likesFromUser.splice(userIndex, 1);

    return this.repository.update(id, { likesFromUser });
  }
}
