import { Injectable } from '@nestjs/common';
import { CreateSmartphoneDto } from './dto/create-smartphone.dto';
import { UpdateSmartphoneDto } from './dto/update-smartphone.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Smartphone } from './entities/smartphone.entity';

@Injectable()
export class SmartphoneService {
  constructor(
    @InjectRepository(Smartphone)
    private smartphoneRepository: Repository<Smartphone>,
  ) {}
  create(createSmartphoneDto: CreateSmartphoneDto) {
    return this.smartphoneRepository.save(createSmartphoneDto);
  }

  findAll() {
    return this.smartphoneRepository.find({
      order: {
        id: 'DESC',
      },
      relations: {
        detallesmartphone: true,
      },
    });
  }
  findPagination(id: number) {
    const skipElement = (id - 1) * 12;
    return this.smartphoneRepository.find({
      take: 12,
      order: {
        id: 'DESC',
      },
      skip: skipElement,
      relations: {
        detallesmartphone: true,
      },
    });
  }

  findOne(id: number) {
    return this.smartphoneRepository.find({
      where: { id: id },
      relations: {
        detallesmartphone: true,
      },
    });
  }

  update(id: number, updateSmartphoneDto: UpdateSmartphoneDto) {
    return this.smartphoneRepository.update(id, updateSmartphoneDto);
  }

  remove(id: number) {
    return this.smartphoneRepository.delete(id);
  }
}
