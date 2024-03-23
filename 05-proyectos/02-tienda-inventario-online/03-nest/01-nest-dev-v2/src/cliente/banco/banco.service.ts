import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Banco } from './entities/banco.entity';
import { Dni } from '../dni/entities/dni.entity';

@Injectable()
export class BancoService {
  constructor(
    @InjectRepository(Banco)
    private bancosRepository: Repository<Banco>,
    @InjectRepository(Dni)
    private dnisRepository: Repository<Dni>,
  ) {}
  create(createBancoDto: CreateBancoDto) {
    return this.bancosRepository.save(createBancoDto);
  }

  async saveBancosWithDnisManyToMany(id: number, body: CreateBancoDto) {
    const dni = await this.dnisRepository.findOneBy({ id });
    if (dni) {
      const banco = this.bancosRepository.create(body);
      banco.dnis = [dni];
      await this.bancosRepository.save(banco);
      return banco;
    }
    throw new NotFoundException(`No encontramos el banco ${id}`);
  }

  findAll() {
    return this.bancosRepository.find({
      relations: { dnis: { cliente: true } },
    });
  }

  findOne(id: number) {
    return this.bancosRepository.find({
      where: { id: id },
      relations: { dnis: { cliente: true } },
    });
  }

  update(id: number, updateBancoDto: UpdateBancoDto) {
    return this.bancosRepository.update(id, updateBancoDto);
  }

  remove(id: number) {
    return this.bancosRepository.delete(id);
  }
}
