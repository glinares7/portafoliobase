import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// import { Photo } from './entities/photo.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  async create(createUserDto: CreateUserDto): Promise<User> {
    // return `This action adds a new user ${firstName} y ${lastName}`;

    const createValue = await this.usersRepository.save({
      firsName: createUserDto.firsName,
      lastName: createUserDto.lastName,
      isActive: createUserDto.isActive,
    });

    if (createValue) {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          error: 'registros guardados',
        },
        HttpStatus.OK,
      );
    }
    createValue;
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'no se guardo faltan datos',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      where: { isActive: true },
    });
    // return `This action returns all users`;
  }

  async findOne(id: number): Promise<User | null> {
    // return this.usersRepository.find(id, { where: { isActive: true } });
    // return `This action returns a #${id} user`;

    const userExist = await this.usersRepository.findOneBy({ id });

    if (!userExist || userExist.isActive === false) {
      throw new NotFoundException('Este usuario no existe');
    }

    return userExist;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    const updateList = await this.usersRepository.update(id, {
      firsName: updateUserDto.firsName,
      lastName: updateUserDto.lastName,
    });

    if (updateList) {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          error: 'El usuario se actualizo',
        },
        HttpStatus.OK,
      );
    }
    return updateList;
  }

  async remove(id: number): Promise<void> {
    const userExist = await this.usersRepository.findOneBy({ id });
    if (!userExist) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'NO SE BORRO / USUARIO NO ENCONTRADO',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const eliminar = await this.usersRepository.delete(id);
    if (eliminar) {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          error: 'User borrado',
        },
        HttpStatus.OK,
      );
    }

    // return `This action removes a #${id} user`;
  }
}
