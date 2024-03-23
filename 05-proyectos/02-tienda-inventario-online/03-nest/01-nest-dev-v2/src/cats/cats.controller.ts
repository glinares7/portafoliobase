import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Request, Response } from 'express';
import { CreateCatDto } from './create-cat.dto';
import { ListAllEntities } from './listAllEntitties';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  // @Get('ab*cd')
  @Get()
  getE1(@Query() query: ListAllEntities) {
    return this.catsService.findAll(query);
  }

  @Get(':token')
  findOne(@Param('token') id: any): string {
    // console.log(id);
    return `This action returns a #${id} cat`;
  }

  @Post()
  @Header('Cache-Control', 'none')
  @HttpCode(201)
  postE1(@Body() { nombre }: CreateCatDto) {
    return this.catsService.postExample(nombre);
  }

  @Put(':id')
  PutE1(@Param('id') id: string, @Body() { nombre, apellido }: CreateCatDto) {
    return `This action updates a #${id} cat con nombre ${nombre} y apellido ${apellido}`;
  }

  @Delete(':id')
  deleteE1(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  //*customize path
  @Get('pas/e2')
  // {
  //   "url": string,
  //   "statusCode": number
  // }
  @Redirect('https://docs.nestjs.com', 302)
  getE2(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get('pas/mon')
  // @Res({ passthrough: true })
  hol(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const nombre = request.body;
    this.catsService.nuevaR(nombre, response);
  }

  @Get('pas/tes')
  getExample(@Res() res: Response) {
    const responseData = {
      message: 'Ejemplo de respuesta modificada 11',
    };
    // Modificamos la respuesta antes de enviarla
    responseData['timestamp'] = new Date();
    // Enviamos la respuesta modificada
    res.json(responseData);
  }
}
