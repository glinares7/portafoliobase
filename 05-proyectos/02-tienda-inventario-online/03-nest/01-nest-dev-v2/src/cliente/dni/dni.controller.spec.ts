import { Test, TestingModule } from '@nestjs/testing';
import { DniController } from './dni.controller';
import { DniService } from './dni.service';

describe('DniController', () => {
  let controller: DniController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DniController],
      providers: [DniService],
    }).compile();

    controller = module.get<DniController>(DniController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
