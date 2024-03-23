import { Test, TestingModule } from '@nestjs/testing';
import { ListacompraService } from './listacompra.service';

describe('ListacompraService', () => {
  let service: ListacompraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListacompraService],
    }).compile();

    service = module.get<ListacompraService>(ListacompraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
