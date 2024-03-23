import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetallesmartphoneService } from './detallesmartphone.service';
import { CreateDetallesmartphoneDto } from './dto/create-detallesmartphone.dto';
import { UpdateDetallesmartphoneDto } from './dto/update-detallesmartphone.dto';

@Controller('detallesmartphone')
export class DetallesmartphoneController {
  constructor(
    private readonly detallesmartphoneService: DetallesmartphoneService,
  ) {}

  @Post(':id')
  create(
    @Param('id') id: string,
    @Body() createDetallesmartphoneDto: CreateDetallesmartphoneDto,
  ) {
    return this.detallesmartphoneService.create(
      +id,
      createDetallesmartphoneDto,
    );
  }

  @Get()
  findAll() {
    return this.detallesmartphoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallesmartphoneService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetallesmartphoneDto: UpdateDetallesmartphoneDto,
  ) {
    return this.detallesmartphoneService.update(
      +id,
      updateDetallesmartphoneDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallesmartphoneService.remove(+id);
  }
}
