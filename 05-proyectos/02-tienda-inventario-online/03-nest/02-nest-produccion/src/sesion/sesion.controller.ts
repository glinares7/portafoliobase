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
import { SesionService } from './sesion.service';
import { CreateSesionDto } from './dto/create-sesion.dto';
import { UpdateSesionDto } from './dto/update-sesion.dto';
import { Request } from 'express';

@Controller('sesion')
export class SesionController {
  constructor(private readonly sesionService: SesionService) {}

  @Post('login/:id')
  create(
    @Param('id') id: string,
    @Body() createSesionDto: CreateSesionDto,
    @Req() request: Request,
  ) {
    return this.sesionService.create(+id, createSesionDto, request);
  }

  @Get(':sesion/tools')
  findAll(@Param('sesion') sesion: string, @Req() request: Request) {
    return this.sesionService.findAll(sesion, request);
  }
  @Get(':sesion/delete')
  findAllDestroy(@Param('sesion') sesion: string, @Req() request: Request) {
    return this.sesionService.findAllDestroy(sesion, request);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sesionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSesionDto: UpdateSesionDto) {
    return this.sesionService.update(+id, updateSesionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sesionService.remove(+id);
  }
}
