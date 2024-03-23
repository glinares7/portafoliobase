import { Module } from '@nestjs/common';
import { ListacompraService } from './listacompra.service';
import { ListacompraController } from './listacompra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listacompra } from './entities/listacompra.entity';
import { Carritocompra } from 'src/carritocompra/entities/carritocompra.entity';
import { Compra } from 'src/compras/entities/compra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Listacompra, Carritocompra, Compra])],
  controllers: [ListacompraController],
  providers: [ListacompraService],
})
export class ListacompraModule {}
