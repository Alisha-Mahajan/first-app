import { Test, TestingModule } from '@nestjs/testing';
import { UserCredController } from './user-cred.controller';

describe('UserCredController', () => {
  let controller: UserCredController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCredController],
    }).compile();

    controller = module.get<UserCredController>(UserCredController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
