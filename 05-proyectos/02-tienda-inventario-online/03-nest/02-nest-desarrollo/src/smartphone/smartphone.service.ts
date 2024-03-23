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
    return this.smartphoneRepository.find();
  }

  findOne(id: number) {
    return this.smartphoneRepository.find({ where: { id: id } });
  }

  update(id: number, updateSmartphoneDto: UpdateSmartphoneDto) {
    return this.smartphoneRepository.update(id, updateSmartphoneDto);
  }

  remove(id: number) {
    return this.smartphoneRepository.delete(id);
  }
}
