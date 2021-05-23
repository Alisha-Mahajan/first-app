import { Test, TestingModule } from '@nestjs/testing';
import { UserCredService } from './user-cred.service';

describe('UserCredService', () => {
  let service: UserCredService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCredService],
    }).compile();

    service = module.get<UserCredService>(UserCredService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
