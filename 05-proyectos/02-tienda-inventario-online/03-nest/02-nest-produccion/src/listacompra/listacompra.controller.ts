import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListacompraService } from './listacompra.service';
import { CreateListacompraDto } from './dto/create-listacompra.dto';
import { UpdateListacompraDto } from './dto/update-listacompra.dto';

@Controller('listacompra')
export class ListacompraController {
  constructor(private readonly listacompraService: ListacompraService) {}

  @Post()
  create(@Body() createListacompraDto: CreateListacompraDto) {
    return this.listacompraService.create(createListacompraDto);
  }

  @Get()
  findAll() {
    return this.listacompraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listacompraService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateListacompraDto: UpdateListacompraDto,
  ) {
    return this.listacompraService.update(+id, updateListacompraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listacompraService.remove(+id);
  }
}
