import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CreateImageDTO } from '../../models/dto/create-image.dto';

import { ImageEntity } from '../../models/entities';

@Injectable()
export class ImageService extends TypeOrmCrudService<ImageEntity> {
  constructor(@InjectRepository(ImageEntity) repo) {
    super(repo);
  }

  createDTOAndSave(file: Express.Multer.File) {
    const imageDTO = new CreateImageDTO();
    imageDTO.size = file.size;
    imageDTO.imageBlob = file.buffer;
    imageDTO.name = file.originalname;

    const data = this.repo.create(imageDTO);
    return this.repo.save(data);
  }
}
