import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Carritocompra } from 'src/carritocompra/entities/carritocompra.entity';
import { Smartphone } from 'src/smartphone/entities/smartphone.entity';
import { SmartphoneModule } from 'src/smartphone/smartphone.module';
import { CarritocompraModule } from 'src/carritocompra/carritocompra.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Carritocompra, Smartphone]),
    SmartphoneModule,
    CarritocompraModule,
  ],
  exports: [PedidosModule],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
