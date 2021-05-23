import { PartialType } from '@nestjs/swagger';

import { CreateUserPostDTO } from './create-user-post.dto';

export class UpdateUserPostDTO extends PartialType(CreateUserPostDTO) {}
