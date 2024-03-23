import { Module } from '@nestjs/common';
import { CarritocompraService } from './carritocompra.service';
import { CarritocompraController } from './carritocompra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carritocompra } from './entities/carritocompra.entity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carritocompra, Pedido])],
  exports: [CarritocompraModule],
  controllers: [CarritocompraController],
  providers: [CarritocompraService],
})
export class CarritocompraModule {}
