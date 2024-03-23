import { Test, TestingModule } from '@nestjs/testing';
import { PerfilclienteController } from './perfilcliente.controller';
import { PerfilclienteService } from './perfilcliente.service';

describe('PerfilclienteController', () => {
  let controller: PerfilclienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfilclienteController],
      providers: [PerfilclienteService],
    }).compile();

    controller = module.get<PerfilclienteController>(PerfilclienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
