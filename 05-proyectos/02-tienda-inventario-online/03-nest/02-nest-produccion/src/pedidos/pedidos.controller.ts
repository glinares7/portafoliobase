import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // Req
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
// import { Request } from 'express';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post(':idcarrito/:idsmart/compra')
  create(
    @Param('idcarrito') idcarrito: string,
    @Param('idsmart') idsmart: string,
    @Body() createPedidoDto: CreatePedidoDto,
  ) {
    return this.pedidosService.create(+idcarrito, +idsmart, createPedidoDto);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }

  @Patch(':id/:idsmart/compra')
  update(
    @Param('id') id: string,
    @Param('idsmart') idsmart: string,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ) {
    return this.pedidosService.update(+id, +idsmart, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }
}
