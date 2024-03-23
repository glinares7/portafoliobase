import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { Compra } from './entities/compra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listacompra } from 'src/listacompra/entities/listacompra.entity';
import { Emailcliente } from 'src/emailcliente/entities/emailcliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compra, Listacompra, Emailcliente])],
  controllers: [ComprasController],
  providers: [ComprasService],
})
export class ComprasModule {}
