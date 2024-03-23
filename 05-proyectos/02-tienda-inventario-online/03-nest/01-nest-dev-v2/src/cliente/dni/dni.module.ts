import { Module } from '@nestjs/common';
import { DniService } from './dni.service';
import { DniController } from './dni.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dni } from './entities/dni.entity';
import { Banco } from '../banco/entities/banco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dni, Banco])],
  controllers: [DniController],
  providers: [DniService],
})
export class DniModule {}
