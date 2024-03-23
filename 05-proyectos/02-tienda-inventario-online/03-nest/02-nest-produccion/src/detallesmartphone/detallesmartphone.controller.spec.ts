import { Test, TestingModule } from '@nestjs/testing';
import { DetallesmartphoneController } from './detallesmartphone.controller';
import { DetallesmartphoneService } from './detallesmartphone.service';

describe('DetallesmartphoneController', () => {
  let controller: DetallesmartphoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallesmartphoneController],
      providers: [DetallesmartphoneService],
    }).compile();

    controller = module.get<DetallesmartphoneController>(
      DetallesmartphoneController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
