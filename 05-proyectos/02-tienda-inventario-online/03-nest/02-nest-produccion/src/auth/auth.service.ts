import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constansts';

// import { v4 as uuidv4 } from 'uuid';
// import { jwtConstants } from './constansts';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async signAuth(id: number, createAuthDto: CreateAuthDto) {
    console.log('pass', createAuthDto.password);
    console.log('id', id);

    const resUser: any = await this.usersService.encryptOne(id);
    if (resUser[0]?.encrypt !== createAuthDto.password) {
      throw new UnauthorizedException();
    }

    const payload = { id: resUser[0].id, username: resUser[0].username };

    createAuthDto.user = await this.usersService.findOne(169);
    createAuthDto.token = await this.jwtService.signAsync(payload);

    // session.visit;
    // const tokenKey = await this.jwtService.signAsync(payload, {
    //   secret: jwtConstants.secret,
    // });

    // console.log('token', await this.jwtService.signAsync(payload));

    //* decode
    // console.log(
    //   'payload',
    //   await this.jwtService.verifyAsync(tokenKey, {
    //     secret: jwtConstants.secret,
    //   }),
    // );

    //* corregir
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = createAuthDto;
    // this.authRepository.save(result);
    return result;
    // return await this.jwtService.signAsync(payload);
  }

  findAll() {
    return this.authRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }
  async findOneUser(id: number, token: string) {
    if (!token) {
      throw new NotFoundException();
    }

    const resTokenValue = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });

    console.log(id);
    console.log(resTokenValue);

    // const isTokenExpired = Date.now() >= resTokenValue.exp * 1000;

    console.log('tiempo de expiración', new Date(resTokenValue.exp * 1000));

    if (id != resTokenValue.id) {
      throw new UnauthorizedException();
    }

    return this.usersService.encryptOne(resTokenValue.id);
  }

  findOne(id: number) {
    // return await this.usersService.findOne(id);
    return this.authRepository.find({ where: { id: id } });
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.authRepository.update(id, updateAuthDto);
  }

  remove(id: number) {
    return this.authRepository.delete(id);
  }
}
