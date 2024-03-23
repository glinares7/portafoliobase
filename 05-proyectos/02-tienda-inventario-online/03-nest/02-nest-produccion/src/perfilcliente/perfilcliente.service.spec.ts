import { Test, TestingModule } from '@nestjs/testing';
import { PerfilclienteService } from './perfilcliente.service';

describe('PerfilclienteService', () => {
  let service: PerfilclienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfilclienteService],
    }).compile();

    service = module.get<PerfilclienteService>(PerfilclienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
