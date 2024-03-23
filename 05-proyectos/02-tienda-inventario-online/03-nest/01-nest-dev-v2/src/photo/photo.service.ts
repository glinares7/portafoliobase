import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';

import { CreatePhotoDto } from './dto/create-photo.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';
// import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Cliente)
    private ClienteRepository: Repository<Cliente>,
    @InjectRepository(Photo)
    private PhotoRepository: Repository<Photo>,
  ) {}

  create(createPhotoDto: CreatePhotoDto) {
    return this.PhotoRepository.save(createPhotoDto);
  }
  async savePhotoWithClientManyToOne(id: number, body: CreatePhotoDto) {
    const cliente = await this.ClienteRepository.findOneBy({ id });
    // console.log(cliente, id);
    if (cliente) {
      const photos = this.PhotoRepository.create(body);
      photos.cliente = cliente;
      await this.PhotoRepository.save(photos);
      return photos;
    }
    throw new NotFoundException(`No encontramos el producto ${id}`);
  }

  findAll() {
    return this.PhotoRepository.find({
      relations: {
        cliente: true,
      },
    });
  }

  findOne(id: number) {
    return this.PhotoRepository.find({
      relations: {
        cliente: true,
      },
      where: { id: id },
    });
  }

  // update(id: number, updatePhotoDto: UpdatePhotoDto) {
  //   return `This action updates a #${id} photo ${updatePhotoDto}`;
  // }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
