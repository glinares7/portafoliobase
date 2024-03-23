import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CarritocompraService } from './carritocompra.service';
import { CreateCarritocompraDto } from './dto/create-carritocompra.dto';
import { UpdateCarritocompraDto } from './dto/update-carritocompra.dto';
import { Request } from 'express';

@Controller('carritocompra')
export class CarritocompraController {
  constructor(private readonly carritocompraService: CarritocompraService) {}

  @Post()
  create(
    @Body() createCarritocompraDto: CreateCarritocompraDto,
    @Req() request: Request,
  ) {
    return this.carritocompraService.create(createCarritocompraDto, request);
  }

  // @Post('buy')
  // buyCarrito(@Body() createCarritocompraDto: CreateCarritocompraDto) {
  //   return this.carritocompraService.buyCompra(createCarritocompraDto);
  // }

  @Get()
  findAll() {
    return this.carritocompraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carritocompraService.findOne(+id);
  }
  @Get(':session/session')
  findOneSession(@Param('session') session: string) {
    return this.carritocompraService.findOneSession(session);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarritocompraDto: UpdateCarritocompraDto,
  ) {
    return this.carritocompraService.update(+id, updateCarritocompraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carritocompraService.remove(+id);
  }
}
