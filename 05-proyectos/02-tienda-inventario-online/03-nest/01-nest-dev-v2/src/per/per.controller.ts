import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PerService } from './per.service';
import { CreatePerDto } from './dto/create-per.dto';
import { UpdatePerDto } from './dto/update-per.dto';
import { Per } from './interfaces/per.interface';

@Controller('per')
export class PerController {
  constructor(private readonly perService: PerService) {}
  @Post()
  create(@Body() createPerDto: CreatePerDto) {
    return this.perService.create(createPerDto);
  }

  @Get()
  async findAll(): Promise<Per[]> {
    return this.perService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.perService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerDto: UpdatePerDto) {
    return this.perService.update(
      +id,
      updatePerDto.nombre,
      updatePerDto.apellido,
      updatePerDto.age,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.perService.remove(id);
  }
}
