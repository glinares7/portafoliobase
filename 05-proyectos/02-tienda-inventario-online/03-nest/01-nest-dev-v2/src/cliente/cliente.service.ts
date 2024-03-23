import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { Dni } from './dni/entities/dni.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Dni)
    private dniRepository: Repository<Dni>,
  ) {}
  create(body: CreateClienteDto) {
    return this.clienteRepository.save(body);
  }

  async saveClientWithDniOneToOne(id: number, body: CreateClienteDto) {
    const dni = await this.dniRepository.findOneBy({ id });
    if (dni) {
      const cliente = this.clienteRepository.create(body);
      cliente.dni = dni;
      await this.clienteRepository.save(cliente);
      return cliente;
    }
    throw new NotFoundException(`No encontramos el dni ${id}`);
  }
  findAll() {
    return this.clienteRepository.find({
      // relations: ['photos', 'dni', 'dni.bancos'],
      relations: {
        photos: true,
        dni: {
          bancos: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.clienteRepository.find({
      // relations: ['photos', 'dni', 'dni.bancos'],
      relations: {
        photos: true,
        dni: {
          bancos: true,
        },
      },
      where: { id: id },
    });
  }

  update(id: number, body: UpdateClienteDto) {
    return this.clienteRepository.update(id, body);
  }

  remove(id: number) {
    return this.clienteRepository.delete(id);
  }
}
