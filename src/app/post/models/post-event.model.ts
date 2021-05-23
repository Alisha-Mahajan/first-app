import { BaseEventModel } from 'src/app/shared/models';

export interface IPostEventInterface {
  id: string;
  message: string;
  title: string;
}
export class PostEventModel extends BaseEventModel<IPostEventInterface> {
  type = 'Post Created';
  constructor(data?: Partial<IPostEventInterface>) {
    super(data);
  }
}
