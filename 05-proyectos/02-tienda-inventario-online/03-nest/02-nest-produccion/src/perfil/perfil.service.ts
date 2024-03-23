import { Injectable } from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfil } from './entities/perfil.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(Perfil)
    private perfilRepository: Repository<Perfil>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(id: number, createPerfilDto: CreatePerfilDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (user) {
      const perfil = this.perfilRepository.create(createPerfilDto);
      perfil.user = user;
      await this.perfilRepository.save(perfil);
      return perfil;
    }
  }

  findAll() {
    return this.perfilRepository.find({
      order: {
        id: 'DESC',
      },
      relations: {
        user: true,
      },
    });
  }

  findOne(id: number) {
    return this.perfilRepository.find({ where: { id: id } });
  }

  update(id: number, updatePerfilDto: UpdatePerfilDto) {
    return this.perfilRepository.update(id, updatePerfilDto);
  }

  remove(id: number) {
    return this.perfilRepository.delete(id);
  }
}
