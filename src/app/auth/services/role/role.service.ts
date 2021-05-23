import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDTO } from '../../models/dto/create-role.dto';
import { RoleEntity } from '../../models/entities';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repo: Repository<RoleEntity>,
  ) {}

  findAll() {
    this.repo.find();
  }

  findByID(id: string) {
    this.repo.findOne(id);
  }

  create(dto: CreateRoleDTO) {
    const role = this.repo.create(dto);
    this.repo.save(role);
  }
}
