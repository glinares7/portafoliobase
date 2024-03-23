import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find({
      select: [
        'id',
        'username',
        'userpass',
        'role',
        'state',
        'createAt',
        'updatedAt',
      ],
      relations: {
        perfil: true,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.userRepository.find({
      where: { id: id },
      select: [
        'id',
        'username',
        'userpass',
        'role',
        'state',
        'createAt',
        'updatedAt',
      ],
      relations: {
        perfil: true,
      },
    });
    // return this.userRepository.findOneBy({ id });
  }

  getEncrypt() {
    return this.userRepository.find({
      select: ['id', 'username', 'encrypt', 'role', 'state'],
      relations: {
        perfil: true,
      },
      order: {
        id: 'DESC',
      },
    });
    // return this.userRepository.findOneBy({ id });
  }
  encryptOne(id: number) {
    return this.userRepository.find({
      where: { id: id },
      select: ['id', 'username', 'encrypt', 'role', 'state'],
      relations: {
        perfil: true,
      },
    });
    // return this.userRepository.findOneBy({ id });
  }

  // auth(id: number) {
  //   const resAuth: any = this.userRepository.find({
  //     where: { id: id },
  //     select: ['id', 'username', 'userpass'],
  //     relations: {
  //       perfil: false,
  //     },
  //   });

  //   return resAuth;
  //   // return this.userRepository.findOneBy({ id });
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    // return `This action removes a #${id} user`;
    return this.userRepository.delete(id);
  }
}
