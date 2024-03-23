import { Test, TestingModule } from '@nestjs/testing';
import { PerController } from './per.controller';
import { PerService } from './per.service';

describe('PerController', () => {
  let controller: PerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerController],
      providers: [PerService],
    }).compile();

    controller = module.get<PerController>(PerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
