import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { PostEntity } from 'src/app/post/models/entities';
import { Repository } from 'typeorm';

import { CreateUserPostDTO } from '../../models/dto';
import { UserEntity, UserPostEntity } from '../../models/entities';

@Injectable()
export class UserPostService {
  constructor(
    @InjectRepository(UserPostEntity)
    private readonly userPostRepo: Repository<UserPostEntity>,
  ) {}

  create(dto: CreateUserPostDTO) {
    const model = this.userPostRepo.create();
    model.user = plainToClass(UserEntity, { id: dto.userId });
    model.post = plainToClass(PostEntity, { id: dto.postId });

    return this.userPostRepo.save(model);
  }

  findPostBookmarkedByUser(userId: string) {
    return this.userPostRepo.find({ where: userId });
  }

  findUsersBookmarkedThisPost(postId: string) {
    return this.userPostRepo.find({ where: postId });
  }

  async delete(postId: string, userId: string) {
    const record = await this.userPostRepo.findOne({
      where: { userId, postId },
    });
    return this.userPostRepo.softDelete(record);
  }
}
