import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDniDto } from './dto/create-dni.dto';
import { UpdateDniDto } from './dto/update-dni.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Dni } from './entities/dni.entity';
import { Banco } from '../banco/entities/banco.entity';

@Injectable()
export class DniService {
  constructor(
    @InjectRepository(Dni)
    private dniRepository: Repository<Dni>,
    @InjectRepository(Banco)
    private bancosRepository: Repository<Banco>,
  ) {}
  create(createDniDto: CreateDniDto) {
    return this.dniRepository.save(createDniDto);
  }
  async saveDniWithBancosManyToMany(id: number, body: CreateDniDto) {
    const banco = await this.bancosRepository.findOneBy({ id });
    if (banco) {
      const dni = this.dniRepository.create(body);
      dni.bancos = [banco];
      await this.dniRepository.save(dni);
      return dni;
    }
    throw new NotFoundException(`No encontramos el banco ${id}`);
  }

  findAll() {
    return this.dniRepository.find({
      relations: { cliente: true, bancos: true },
    });
  }

  findOne(id: number) {
    return this.dniRepository.find({
      relations: { cliente: true, bancos: true },
      where: { id: id },
    });
  }

  update(id: number, updateDniDto: UpdateDniDto) {
    return this.dniRepository.update(id, updateDniDto);
  }

  remove(id: number) {
    return this.dniRepository.delete(id);
  }
}
