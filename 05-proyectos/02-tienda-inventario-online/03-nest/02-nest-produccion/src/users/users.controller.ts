import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // console.log('user-back', createUserDto);

    const iv = randomBytes(16);
    const password = '3st0esl4clav3seçr3t4$';

    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    console.log('contraseña a encryptar', createUserDto.userpass);

    const textToEncrypt = createUserDto.userpass;

    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);

    //* Convertir  Buffer abase64
    const resEncrypSol = encryptedText.toString('base64');
    console.log('texto encriptado base64', resEncrypSol);

    // //* Convertir base64 a Buffer
    const encryptedBuffer = Buffer.from(resEncrypSol, 'base64');

    console.log('texto base64  a buffer', encryptedBuffer);

    // //*desemcriptar

    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(encryptedBuffer),
      decipher.final(),
    ]);

    console.log('texto a desemcrptar ', decryptedText.toString('utf-8'));

    createUserDto.userpass = resEncrypSol;
    createUserDto.encrypt = decryptedText.toString('utf-8');

    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // const iv = randomBytes(16);
    // const password = '3st0esl4clav3seçr3t4$';

    // const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;

    // const cipher = createCipheriv('aes-256-ctr', key, iv);

    // const textToEncrypt = 'el dìa domingo es día del señor';

    // const encryptedText = Buffer.concat([
    //   cipher.update(textToEncrypt, 'utf-8'),
    //   cipher.final(),
    // ]);

    // //* Convertir  Buffer abase64
    // const resEncrypSol = encryptedText.toString('base64');
    // console.log('texto encriptado base64', resEncrypSol);

    // //* Convertir base64 a Buffer
    // const encryptedBuffer = Buffer.from(resEncrypSol, 'base64');

    // console.log('texto base64  a buffer', encryptedBuffer);

    // //*desemcriptar

    // const decipher = createDecipheriv('aes-256-ctr', key, iv);
    // const decryptedText = Buffer.concat([
    //   decipher.update(encryptedBuffer),
    //   decipher.final(),
    // ]);

    // console.log('texto a desemcrptar ', decryptedText.toString('utf-8'));

    return this.usersService.findOne(+id);
  }

  // @Get('auth/auth')
  // getAuth() {
  //   console.log('busqueda desde el cliente');

  //   return this.usersService.getEncrypt();
  // }
  @Post('auth/encrypt')
  getEncrypt() {
    console.log('busqueda desde el cliente');

    return this.usersService.getEncrypt();
  }

  @Post('encrypt/:id')
  async auth(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    const resUserEx: any = await this.usersService.encryptOne(+id);

    console.log('back-end encrypt pass', resUserEx[0].encrypt);

    console.log('datos del input', createUserDto.userpass);

    if (resUserEx[0]?.encrypt !== createUserDto.userpass) {
      throw new UnauthorizedException();
    }
    // return response.json({ msg: 'usuario no autorizado' });

    return response.json(resUserEx[0]);

    //*condicional
    // if (createUserDto.userpass === decryptedText.toString('utf-8')) {
    //   // return this.usersService.auth(+id);

    //   return response.json({
    //     id: resUserEx[0].id,
    //     username: resUserEx[0].username,
    //     userpass: decryptedText.toString('utf-8'),
    //   });
    // } else {
    //   throw new UnauthorizedException();
    // }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
