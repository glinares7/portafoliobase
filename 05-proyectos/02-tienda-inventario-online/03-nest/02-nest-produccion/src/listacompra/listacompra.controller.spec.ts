import { Test, TestingModule } from '@nestjs/testing';
import { ListacompraController } from './listacompra.controller';
import { ListacompraService } from './listacompra.service';

describe('ListacompraController', () => {
  let controller: ListacompraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListacompraController],
      providers: [ListacompraService],
    }).compile();

    controller = module.get<ListacompraController>(ListacompraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
