import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { ImageEntity } from '../../models/entities';
import { ImageService } from '../../services';

@Crud({
  model: {
    type: ImageEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
@ApiTags('image')
@Controller('image')
export class ImageController implements CrudController<ImageEntity> {
  constructor(public service: ImageService) {}
}
