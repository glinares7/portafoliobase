import { Injectable } from '@nestjs/common';
import { CreateDetallesmartphoneDto } from './dto/create-detallesmartphone.dto';
import { UpdateDetallesmartphoneDto } from './dto/update-detallesmartphone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Detallesmartphone } from './entities/detallesmartphone.entity';
import { Repository } from 'typeorm';
// import { Smartphone } from 'src/smartphone/entities/smartphone.entity';
import { Smartphone } from 'src/smartphone/entities/smartphone.entity';

@Injectable()
export class DetallesmartphoneService {
  constructor(
    @InjectRepository(Smartphone)
    private smartphoneRepository: Repository<Smartphone>,
    @InjectRepository(Detallesmartphone)
    private detalleSmartphoneRepository: Repository<Detallesmartphone>,
  ) {}
  async create(
    id: number,
    createDetallesmartphoneDto: CreateDetallesmartphoneDto,
  ) {
    console.log('id-server-hoy', id);

    try {
      const smartphoneOneDetalles = await this.smartphoneRepository.findOneBy({
        id,
      });

      if (smartphoneOneDetalles) {
        const detalleSmart = this.detalleSmartphoneRepository.create(
          createDetallesmartphoneDto,
        );
        // console.log(detalleSmart);

        detalleSmart.smartphone = smartphoneOneDetalles;
        await this.detalleSmartphoneRepository.save(detalleSmart);
        return detalleSmart;
      }
    } catch (error) {
      if (error.name === 'QueryFailedError') {
        return {
          msg: 'duplicate key - server',
        };
      }
      console.log('error- nameServer', error);
    }
    // return this.detalleSmartphoneRepository.save(createDetallesmartphoneDto);
    return {
      msg: 'servidor alterno fix',
    };
  }

  findAll() {
    return this.detalleSmartphoneRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.detalleSmartphoneRepository.find({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateDetallesmartphoneDto: UpdateDetallesmartphoneDto) {
    // console.log('datos del dto', updateDetallesmartphoneDto);
    return this.detalleSmartphoneRepository.update(
      id,
      updateDetallesmartphoneDto,
    );
  }

  remove(id: number) {
    return this.detalleSmartphoneRepository.delete(id);
  }
}
