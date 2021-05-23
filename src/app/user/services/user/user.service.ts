import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from 'src/app/shared/models/entities';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDto } from '../../models/dto';
import { UserEntity } from '../../models/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  findAll() {
    return this.repository.find({ relations: ['posts', 'role', 'image'] });
  }

  findWithRelByID(id: string) {
    return this.repository.findOne(id, { relations: ['role', 'image'] });
  }

  findByID(id: string) {
    return this.repository.findOne(id);
  }

  create(userDTO: CreateUserDTO, image?: ImageEntity) {
    const user = this.repository.create(userDTO);
    if (image) {
      user.image = image;
    }
    return this.repository.save(user);
  }

  update(id: string, dto: UpdateUserDto) {
    return this.repository.update(id, dto);
  }
}
