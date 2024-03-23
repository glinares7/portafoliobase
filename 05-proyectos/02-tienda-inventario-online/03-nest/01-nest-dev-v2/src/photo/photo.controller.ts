import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
// import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }

  @Post(':id/cliente')
  async createPhoto(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreatePhotoDto,
  ) {
    return this.photoService.savePhotoWithClientManyToOne(id, body);
    // return this.photoService.create(id);
  }

  @Get()
  findAll() {
    return this.photoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
  //   return this.photoService.update(+id, updatePhotoDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }
}
