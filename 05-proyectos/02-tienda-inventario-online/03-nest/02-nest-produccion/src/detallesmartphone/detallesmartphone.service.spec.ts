import { Test, TestingModule } from '@nestjs/testing';
import { DetallesmartphoneService } from './detallesmartphone.service';

describe('DetallesmartphoneService', () => {
  let service: DetallesmartphoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetallesmartphoneService],
    }).compile();

    service = module.get<DetallesmartphoneService>(DetallesmartphoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
