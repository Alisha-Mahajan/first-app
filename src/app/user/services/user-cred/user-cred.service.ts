import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserCredDTO } from '../../models/dto';
import { UserCredEntity, UserEntity } from '../../models/entities';

@Injectable()
export class UserCredService {
  constructor(
    @InjectRepository(UserCredEntity)
    private readonly repository: Repository<UserCredEntity>,
  ) {}

  findAll() {
    return this.repository.find({ relations: ['user'] });
  }

  findByID(id: string) {
    return this.repository.findOne(id);
  }

  create(dto: CreateUserCredDTO) {
    const userCred = this.repository.create(dto);
    userCred.user = new UserEntity();
    userCred.user.id = dto.userId;

    return this.repository.save(userCred);
  }

  async findOne(
    username: string,
    password: string,
  ): Promise<UserEntity | undefined> {
    const userRecord = await this.repository.findOne({
      where: { username },
      relations: ['user', 'user.role'],
    });
    return userRecord.password === password ? userRecord.user : null;
  }
}
