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
  HttpStatus,
  Res,
} from '@nestjs/common';
import { SmartphoneService } from './smartphone.service';
import { CreateSmartphoneDto } from './dto/create-smartphone.dto';
import { UpdateSmartphoneDto } from './dto/update-smartphone.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

@Controller('smartphone')
export class SmartphoneController {
  constructor(private readonly smartphoneService: SmartphoneService) {}

  @Post()
  create(@Body() createSmartphoneDto: CreateSmartphoneDto) {
    createSmartphoneDto.picture = decodeURIComponent(
      createSmartphoneDto.picture,
    );
    return this.smartphoneService.create(createSmartphoneDto);
  }
  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/img/03-mix',
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
  createWriteFile(@UploadedFile() file, @Res() response: Response) {
    // return this.smartphoneService.create(createSmartphoneDto);
    console.log(file);

    //*Peticion al cliente para realizar la descarga
    // const archivoPath = path.join(
    //   __dirname,
    //   `../../public/img/${file.originalname}`,
    // );

    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader(
    //   'Content-Disposition',
    //   `attachment; filename=${file.originalname}`,
    // );
    // res.sendFile(archivoPath);
    const pay = {
      randPicture: file.filename,
    };
    response.status(HttpStatus.CREATED).json(pay);
  }

  @Post(':id/res')
  serveDatos(@Res() response: Response) {
    const pay = {
      nombre: 'abc',
      nacionalidad: 'xyz-c',
      edad: 20,
    };
    response.status(HttpStatus.CREATED).json(pay);
  }

  @Get()
  findAll() {
    return this.smartphoneService.findAll();
  }
  @Get(':id/pagination')
  findPagination(@Param('id') id: string) {
    return this.smartphoneService.findPagination(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.smartphoneService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSmartphoneDto: UpdateSmartphoneDto,
  ) {
    return this.smartphoneService.update(+id, updateSmartphoneDto);
  }

  //* solo si el elemento existe
  @Patch(':id/file')
  @UseInterceptors(FileInterceptor('file'))
  async patchFileTest(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const removeFile = (msg) =>
      new Promise((resolve, reject) => {
        if (fs.existsSync(`./public/img/${id}.mp3`)) {
          resolve(fs.unlinkSync(`./public/img/${id}.mp3`));
          console.log(msg);
        }
        reject(`ǹo hay elemento - test`);
      });

    const upFile = (msg, file) =>
      new Promise((resolve) => {
        resolve(fs.writeFileSync(`./public/img/${id}.mp3`, file.buffer));
        console.log(msg);
      });

    try {
      await removeFile('se elimino').catch((err) => console.log(err));
      await upFile('se actualizo', file);
      return {
        data: file.originalname,
      };
    } catch (error) {
      throw error;
    }
  }

  //* guarda el archivo y crea un nombrebase
  @Patch(':id/filetest')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/img/03-mix',
        filename: (req, file, cb) => {
          const extname = path.extname(file.originalname);
          file.originalname = path.basename(
            Buffer.from(file.originalname, 'latin1').toString('utf-8'),
            extname,
          );
          const uniqueSuflix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          // const filename = file.fieldname + '-' + uniqueSuflix + extname;

          const filename = uniqueSuflix + '-' + file.originalname + extname;
          cb(null, filename);
        },
      }),
    }),
  )
  async patchFileprueba(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ) {
    console.log(file);
    const pay = {
      randonPicture: file.filename,
    };
    response.status(HttpStatus.CREATED).json(pay);
  }

  //* existencia del archivo y lo borra
  @Patch(':id/fileVerify')
  async patchFileVerify(
    @Param('id') id: string,
    @Body() createSmartphoneDto: CreateSmartphoneDto,
  ) {
    console.log('datos de afuera', createSmartphoneDto.picture);

    const removeFile = (msg) =>
      //* consulta a la BD de url de la imagen y ponerlo en el ID
      new Promise((resolve, reject) => {
        const { picture }: any = createSmartphoneDto;

        console.log(picture);
        const arrPicture = picture.split('/');
        const arrPicture1 = arrPicture.at(-2);
        const arrPicture2 = arrPicture.at(-1);

        if (fs.existsSync(`./public/img/${arrPicture1}/${arrPicture2}`)) {
          fs.unlinkSync(`./public/img/${arrPicture1}/${arrPicture2}`);
          console.log(msg);
        } else {
          reject('no hay elemento');
        }
      });

    await removeFile('se elimino').catch((err) => console.log(err));

    return {
      statusCode: 200,
      msg: 'procesando..',
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smartphoneService.remove(+id);
  }
  @Delete(':id/file')
  removeFile(
    @Param('id') id1: string,
    @Body() createSmartphoneDto: CreateSmartphoneDto,
  ) {
    const { picture }: any = createSmartphoneDto;

    console.log(picture);

    const arrPicture = picture.split('/');
    const arrPicture1 = arrPicture.at(-2);
    const arrPicture2 = arrPicture.at(-1);

    if (fs.existsSync(`./public/img/${arrPicture1}/${arrPicture2}`)) {
      fs.unlinkSync(`./public/img/${arrPicture1}/${arrPicture2}`);
      console.log('se elimino');
    } else {
      console.log('no se elimino');
    }
  }
}

//todo test
// @Patch(':id/file')
// removeFileTest(@Param('id') id: string) {
//   console.log('enviar datos PATCH-FILE', id);
// }
