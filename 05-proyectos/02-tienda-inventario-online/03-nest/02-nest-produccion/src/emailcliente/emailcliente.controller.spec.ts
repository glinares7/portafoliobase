import { Test, TestingModule } from '@nestjs/testing';
import { EmailclienteController } from './emailcliente.controller';
import { EmailclienteService } from './emailcliente.service';

describe('EmailclienteController', () => {
  let controller: EmailclienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailclienteController],
      providers: [EmailclienteService],
    }).compile();

    controller = module.get<EmailclienteController>(EmailclienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
