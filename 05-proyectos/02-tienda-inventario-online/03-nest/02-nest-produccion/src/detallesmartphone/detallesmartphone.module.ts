import { Module } from '@nestjs/common';
import { DetallesmartphoneService } from './detallesmartphone.service';
import { DetallesmartphoneController } from './detallesmartphone.controller';
import { Detallesmartphone } from './entities/detallesmartphone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Smartphone } from 'src/smartphone/entities/smartphone.entity';
import { SmartphoneModule } from 'src/smartphone/smartphone.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Detallesmartphone, Smartphone]),
    SmartphoneModule,
  ],
  controllers: [DetallesmartphoneController],
  providers: [DetallesmartphoneService],
})
export class DetallesmartphoneModule {}
