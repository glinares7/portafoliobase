import { Test, TestingModule } from '@nestjs/testing';
import { PerService } from './per.service';

describe('PerService', () => {
  let service: PerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerService],
    }).compile();

    service = module.get<PerService>(PerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
