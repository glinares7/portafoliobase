import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { PerfilclienteService } from './perfilcliente.service';
import { CreatePerfilclienteDto } from './dto/create-perfilcliente.dto';
import { UpdatePerfilclienteDto } from './dto/update-perfilcliente.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import * as path from 'path';
import { Response } from 'express';

@Controller('perfilcliente')
export class PerfilclienteController {
  constructor(private readonly perfilclienteService: PerfilclienteService) {}

  @Post()
  create(@Body() createPerfilclienteDto: CreatePerfilclienteDto) {
    return this.perfilclienteService.create(createPerfilclienteDto);
  }
  @Post(':emailcliente/prueba')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/img/04-perfil',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);

          const extname = path.extname(file.originalname);
          file.originalname = path.basename(
            Buffer.from(file.originalname, 'latin1').toString('utf-8'),
            extname,
          );
          // const uniqueSuflix =
          //   Date.now() + '-' + Math.round(Math.random() * 1e9);
          // const filename = file.fieldname + '-' + uniqueSuflix + extname;

          const filename = uniqueSuffix + '-' + file.originalname + extname;
          cb(null, filename);
        },
      }),
    }),
  )
  bufferData(
    @Param('emailcliente') emailcliente: string,
    @UploadedFile() file,
  ) {
    return this.perfilclienteService.bufferData(emailcliente, file);
  }

  @Get(':email/buffer')
  async imgBufferGo(@Param('email') email: string, @Res() res: Response) {
    const imageBuffer = await this.perfilclienteService.imgBufferGo(email);

    if (!imageBuffer.imgBuffer) {
      return res.status(200).json({
        msg: 'not file stream buffer ',
      });
    }

    console.log('ext-de afuera', imageBuffer.extBuffer);

    if (
      imageBuffer.extBuffer.includes('jpg') ||
      imageBuffer.extBuffer.includes('jpeg') ||
      imageBuffer.extBuffer.includes('webp') ||
      imageBuffer.extBuffer.includes('gif') ||
      imageBuffer.extBuffer.includes('png')
    ) {
      console.log('pasa a ');

      res.setHeader('Content-Type', `image/${imageBuffer.extBuffer}`);
    }

    if (imageBuffer.extBuffer.includes('mp3')) {
      console.log('pasa b ');
      res.setHeader('Content-Type', `audio/${imageBuffer.extBuffer}`);
    }
    if (imageBuffer.extBuffer.includes('mp4')) {
      console.log('pasa c ');
      res.setHeader('Content-Type', `video/${imageBuffer.extBuffer}`);
    }

    if (imageBuffer.extBuffer.includes('svg')) {
      console.log('pasa d ');

      res.setHeader('Content-Type', `image/svg+xml`);
    }

    if (imageBuffer.extBuffer.includes('txt')) {
      console.log('pasa e ');

      res.setHeader('Content-Type', `text/plain`);
    }

    // Adjust content type according to your image format
    res.send(imageBuffer.imgBuffer);
  }

  @Get()
  findAll() {
    return this.perfilclienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfilclienteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePerfilclienteDto: UpdatePerfilclienteDto,
  ) {
    return this.perfilclienteService.update(+id, updatePerfilclienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfilclienteService.remove(+id);
  }
}
